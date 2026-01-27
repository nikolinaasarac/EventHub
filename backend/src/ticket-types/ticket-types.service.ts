import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketType } from './entities/ticket-type.entity';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class TicketTypesService {
  constructor(
    @InjectRepository(TicketType)
    private readonly ticketTypesRepository: Repository<TicketType>,
    private readonly eventsService: EventsService,
  ) {}

  async create(createTicketTypeDto: CreateTicketTypeDto) {
    const event = await this.eventsService.findOne(createTicketTypeDto.eventId);

    if (!event) {
      throw new NotFoundException(
        `Event with id ${createTicketTypeDto.eventId} not found`,
      );
    }

    const ticketType = this.ticketTypesRepository.create({
      ...createTicketTypeDto,
      event,
      soldQuantity: 0,
    });
    console.log(ticketType);

    return await this.ticketTypesRepository.save(ticketType);
  }

  async findAll() {
    return await this.ticketTypesRepository.find({
      relations: ['event'],
    });
  }

  async findOne(id: number) {
    return await this.ticketTypesRepository.findOne({
      where: { id },
      relations: ['event'],
    });
  }

  async update(id: number, updateTicketTypeDto: UpdateTicketTypeDto) {
    const ticketType = await this.findOne(id);

    if (!ticketType) {
      throw new NotFoundException(`Ticket type with id ${id} not found`);
    }

    Object.assign(ticketType, updateTicketTypeDto);

    return await this.ticketTypesRepository.save(ticketType);
  }

  async remove(id: number) {
    const ticketType = await this.findOne(id);

    if (!ticketType) {
      throw new NotFoundException(`Ticket type with id ${id} not found`);
    }

    return await this.ticketTypesRepository.remove(ticketType);
  }
}
