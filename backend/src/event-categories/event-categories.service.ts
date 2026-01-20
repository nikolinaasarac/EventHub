import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './entities/event-category.entity';

@Injectable()
export class EventCategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly eventCategoriesService: Repository<EventCategory>,
  ) {}
  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const eventType = this.eventCategoriesService.create(
      createEventCategoryDto,
    );
    return await this.eventCategoriesService.save(eventType);
  }

  async findAll() {
    return await this.eventCategoriesService.find();
  }

  async findOne(id: number) {
    return await this.eventCategoriesService.findOne({
      where: { id },
    });
  }

  async update(id: number, updateEventCategoryDto: UpdateEventCategoryDto) {
    const eventType = await this.findOne(id);
    if (!eventType) throw new NotFoundException();
    Object.assign(eventType, updateEventCategoryDto);
    return this.eventCategoriesService.save(eventType);
  }

  async remove(id: number) {
    return await this.eventCategoriesService.delete(id);
  }
}
