import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventSubcategoryDto } from './dto/create-event-subcategory.dto';
import { UpdateEventSubcategoryDto } from './dto/update-event-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventSubcategory } from './entities/event-subcategory.entity';
import { EventCategoriesService } from '../event-categories/event-categories.service';

@Injectable()
export class EventSubcategoriesService {
  constructor(
    @InjectRepository(EventSubcategory)
    private readonly eventSubcategoriesRepository: Repository<EventSubcategory>,
    private readonly eventCategoryService: EventCategoriesService,
  ) {}

  async create(createEventSubcategoryDto: CreateEventSubcategoryDto) {
    const eventCategory = await this.eventCategoryService.findOne(
      createEventSubcategoryDto.categoryId,
    );
    if (!eventCategory)
      throw new NotFoundException(
        `Event category with id ${createEventSubcategoryDto.categoryId} not found`,
      );

    const eventSubcategory = this.eventSubcategoriesRepository.create({
      ...createEventSubcategoryDto,
      eventCategory,
    });

    return this.eventSubcategoriesRepository.save(eventSubcategory);
  }

  async findAll() {
    return await this.eventSubcategoriesRepository.find({
      relations: ['eventCategory'],
    });
  }

  async findOne(id: number) {
    return await this.eventSubcategoriesRepository.findOne({
      where: { id },
      relations: ['eventCategory'],
    });
  }

  async update(
    id: number,
    updateEventSubcategoryDto: UpdateEventSubcategoryDto,
  ) {
    const eventSubcategory = await this.findOne(id);
    if (!eventSubcategory)
      throw new NotFoundException(`Event Subcategory with id ${id} not found`);
    Object.assign(eventSubcategory, updateEventSubcategoryDto);
    return await this.eventSubcategoriesRepository.save(eventSubcategory);
  }

  async remove(id: number) {
    const eventSubcategory = await this.findOne(id);
    if (!eventSubcategory)
      throw new NotFoundException(`Event Subcategory with id ${id} not found`);
    return await this.eventSubcategoriesRepository.remove(eventSubcategory);
  }
}
