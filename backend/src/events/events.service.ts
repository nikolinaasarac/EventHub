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

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly eventSubcategoriesService: EventSubcategoriesService,
    private readonly venuesService: VenuesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
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
      eventSubcategory,
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

  async findOne(id: number) {
    return await this.eventsRepository.findOne({
      where: { id },
      relations: [
        'eventSubcategory',
        'venue',
        'eventSubcategory.eventCategory',
      ],
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    Object.assign(event, updateEventDto);
    await this.eventsRepository.save(this.eventsRepository.create(event));
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    return await this.eventsRepository.remove(event);
  }
}
