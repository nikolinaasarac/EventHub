import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { Repository } from 'typeorm';
import { EventType } from './entities/event-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventType)
    private readonly eventTypesRepository: Repository<EventType>,
  ) {}
  async create(createEventTypeDto: CreateEventTypeDto) {
    const eventType = this.eventTypesRepository.create(createEventTypeDto);
    return await this.eventTypesRepository.save(eventType);
  }

  async findAll() {
    return await this.eventTypesRepository.find();
  }

  async findOne(id: number) {
    return await this.eventTypesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const eventType = await this.findOne(id);
    if (!eventType) throw new NotFoundException();
    Object.assign(eventType, updateEventTypeDto);
    return this.eventTypesRepository.save(eventType);
  }

  async remove(id: number) {
    return await this.eventTypesRepository.delete(id);
  }
}
