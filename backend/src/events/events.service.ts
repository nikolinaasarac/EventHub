import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventSubcategoriesService } from '../event-subcategories/event-subcategories.service';
import { SUBCATEGORY_METADATA_CONFIG } from '../../shared/constants/event-metadata.registry';
import { VenuesService } from '../venues/venues.service';
import { applyQueryOptions } from '../../shared/query-builder.helper';
import { ParamsDto } from '../../shared/params.dto';
import { paginate } from '../../shared/pagination/pagination-helper';
import { join } from 'path';
import { unlink } from 'node:fs/promises';
import { OrganizersService } from '../organizers/organizers.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly eventSubcategoriesService: EventSubcategoriesService,
    private readonly venuesService: VenuesService,
    private readonly organizersService: OrganizersService,
  ) {}

  private async deleteImage(imageUrl?: string) {
    if (!imageUrl) return;

    const imagePath = join(process.cwd(), 'public', imageUrl);
    try {
      await unlink(imagePath);
    } catch (err) {
      console.warn('Slika nije obrisana:', err);
    }
  }

  async create(
    createEventDto: CreateEventDto,
    userId: string,
    imageUrl?: string,
  ) {
    const organizer = await this.organizersService.getOrganizerByUserId(userId);

    if (!organizer) {
      throw new NotFoundException('Only organizers can create events');
    }

    const eventSubcategory = await this.eventSubcategoriesService.findOne(
      createEventDto.eventSubcategoryId,
    );
    if (!eventSubcategory)
      throw new NotFoundException(
        `Event subcategory with id ${createEventDto.eventSubcategoryId} not found`,
      );
    const venue = await this.venuesService.findOne(createEventDto.venueId);
    if (!venue)
      throw new NotFoundException(
        `Venue with id ${createEventDto.venueId} not found`,
      );

    const config =
      SUBCATEGORY_METADATA_CONFIG[eventSubcategory.name.toLowerCase()];

    if (config) {
      for (const field of config.fields) {
        const value = createEventDto.metadata?.[field.key];

        if (
          field.required &&
          (value === undefined || value === null || value === '')
        ) {
          throw new NotFoundException(`Field ${field.key} is required`);
        }
      }
    }
    const event = this.eventsRepository.create({
      ...createEventDto,
      venue,
      imageUrl,
      eventSubcategory,
      organizer,
    });
    return await this.eventsRepository.save(event);
  }

  async findAll(paramsDto: ParamsDto) {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('venue.city', 'city')
      .leftJoinAndSelect('event.eventSubcategory', 'eventSubcategory')
      .leftJoinAndSelect('eventSubcategory.eventCategory', 'eventCategory');

    applyQueryOptions(qb, {
      search: paramsDto.search,
      searchFields: ['event.title'],
      page: paramsDto.page,
      limit: paramsDto.limit,
      order: { 'event.createdAt': 'DESC' },
      filters: {
        'eventSubcategory.eventCategory.id': paramsDto.categories,
        'venue.city.id': paramsDto.cities,
      },
    });
    const [data, total] = await qb.getManyAndCount();
    return paginate(data, total, paramsDto.page, paramsDto.limit);
  }

  async getAllEvents() {
    return await this.eventsRepository.find({
      relations: [
        'eventSubcategory',
        'venue',
        'eventSubcategory.eventCategory',
        'ticketTypes',
        'organizer',
      ],
    });
  }

  async findOne(id: number) {
    return await this.eventsRepository.findOne({
      where: { id },
      relations: [
        'eventSubcategory',
        'venue',
        'eventSubcategory.eventCategory',
        'ticketTypes',
        'organizer',
      ],
    });
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    file?: Express.Multer.File,
  ) {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    if (file) {
      await this.deleteImage(event.imageUrl);
      event.imageUrl = `uploads/${file.filename}`;
    } else if (updateEventDto.imageUrl === '') {
      await this.deleteImage(event.imageUrl);
      event.imageUrl = '';
    }

    if (updateEventDto.venueId) {
      const venue = await this.venuesService.findOne(updateEventDto.venueId);
      if (!venue) {
        throw new NotFoundException(
          `Venue with id ${updateEventDto.venueId} not found`,
        );
      }
      event.venue = venue;
    }

    if (updateEventDto.eventSubcategoryId) {
      throw new NotFoundException('Event subcategory cannot be changed');
    }

    const { venueId, eventSubcategoryId, metadata, ...rest } = updateEventDto;
    Object.assign(event, {
      ...rest,
      imageUrl: event.imageUrl,
    });

    if (!event.eventSubcategory) {
      throw new NotFoundException('Event subcategory not found');
    }

    if (metadata) {
      const subcategoryName = event.eventSubcategory.name.toLowerCase();
      const config = SUBCATEGORY_METADATA_CONFIG[subcategoryName];

      if (config) {
        for (const field of config.fields) {
          const value =
            metadata[field.key] !== undefined
              ? metadata[field.key]
              : event.metadata?.[field.key];

          if (
            field.required &&
            (value === undefined || value === null || value === '')
          ) {
            throw new NotFoundException(`Field ${field.key} is required`);
          }
        }
      }

      event.metadata = {
        ...(event.metadata || {}),
        ...metadata,
      };
    }

    return await this.eventsRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    if (event.imageUrl) {
      const imagePath = join(process.cwd(), 'public', event.imageUrl);
      try {
        await unlink(imagePath);
      } catch (err) {
        console.warn('Slika nije obrisana:', err);
      }
    }
    return await this.eventsRepository.remove(event);
  }
}
