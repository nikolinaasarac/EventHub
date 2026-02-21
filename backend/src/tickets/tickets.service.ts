import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { EventsService } from '../events/events.service';
import { BuyTicketsDto } from './dto/buy-ticket.dto';
import { TicketTypesService } from '../ticket-types/ticket-types.service';
import { MailService } from '../email/mail.service';
import {
  TicketPerDay,
  TicketPerEvent,
} from '../organizers/dto/organizer-statistics.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly ticketTypesService: TicketTypesService,
    private readonly mailService: MailService,
  ) {}

  async buyTickets(dto: BuyTicketsDto, user: User) {
    const event = await this.eventsService.findOne(dto.eventId);
    if (!event) throw new NotFoundException('Event not found');

    const ticketType = await this.ticketTypesService.findOne(dto.ticketTypeId);
    if (!ticketType) throw new NotFoundException('Ticket type not found');

    const availableTickets = ticketType.totalQuantity - ticketType.soldQuantity;
    if (dto.quantity > availableTickets) {
      throw new Error(
        `Nema dovoljno dostupnih karata. Dostupno: ${availableTickets}`,
      );
    }

    const tickets: Ticket[] = [];
    for (let i = 0; i < dto.quantity; i++) {
      const ticket = this.ticketRepository.create({
        user,
        event,
        ticketType,
      });
      tickets.push(ticket);
    }

    const savedTickets = await this.ticketRepository.save(tickets);

    ticketType.soldQuantity += dto.quantity;
    await this.ticketTypesService.update(ticketType.id, {
      soldQuantity: ticketType.soldQuantity,
    });

    await this.mailService.sendTicketPurchaseEmail(user, savedTickets);

    return savedTickets;
  }

  async getUserTickets(userId: string) {
    return this.ticketRepository.find({
      where: { user: { id: userId } },
      relations: ['event', 'ticketType'],
      order: { createdAt: 'DESC' },
    });
  }

  async countSoldByOrganizer(organizerId: number) {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoin('ticket.event', 'event')
      .where('event.organizerId = :organizerId', { organizerId })
      .getCount();
  }

  async getRevenueByOrganizer(organizerId: number): Promise<number> {
    const result: { total: string | null } | undefined =
      await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.event', 'event')
        .innerJoin('ticket.ticketType', 'ticketType')
        .select('SUM(ticketType.price)', 'total')
        .where('event.organizerId = :organizerId', { organizerId })
        .getRawOne();

    return Number(result?.total ?? 0);
  }

  async getTicketsPerEvent(
    organizerId: number,
    limit = 5,
  ): Promise<TicketPerEvent[]> {
    const result = await this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoin('ticket.event', 'event')
      .select('event.id', 'eventId')
      .addSelect('event.title', 'eventTitle')
      .addSelect('COUNT(ticket.id)', 'ticketsSold')
      .where('event.organizerId = :organizerId', { organizerId })
      .groupBy('event.id')
      .addGroupBy('event.title')
      .orderBy('COUNT(ticket.id)', 'DESC')
      .limit(limit)
      .getRawMany<TicketPerEvent>();

    return result.map((item) => ({
      eventId: Number(item.eventId),
      eventTitle: item.eventTitle,
      ticketsSold: Number(item.ticketsSold),
    }));
  }

  async getTicketsPerDay(organizerId: number): Promise<TicketPerDay[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoin('ticket.event', 'event')
      .select('DATE(ticket.createdAt)', 'date')
      .addSelect('COUNT(ticket.id)', 'ticketsSold')
      .where('event.organizerId = :organizerId', { organizerId })
      .groupBy('DATE(ticket.createdAt)')
      .orderBy('DATE(ticket.createdAt)', 'ASC')
      .getRawMany();
  }
}
