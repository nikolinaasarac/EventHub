import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRole } from '../../shared/enums/user-role.enum';
import { EventsService } from '../events/events.service';
import { TicketsService } from '../tickets/tickets.service';
import { OrganizerStatisticsDto } from './dto/organizer-statistics.dto';
import { randomBytes } from 'node:crypto';
import { PasswordTokensService } from '../password-tokens/password-tokens.service';
import { MailService } from '../email/mail.service';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizersRepository: Repository<Organizer>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    @Inject(forwardRef(() => TicketsService))
    private readonly ticketsService: TicketsService,
    private readonly passwordTokenService: PasswordTokensService,
    private readonly mailService: MailService,
  ) {}

  private mapToOrganizerResponse(organizer: Organizer) {
    return {
      id: organizer.id,
      displayName: organizer.displayName,
      description: organizer.description,
      contactEmail: organizer.contactEmail,
      phone: organizer.phone,
      createdAt: organizer.createdAt,
      user: {
        id: organizer.user.id,
        email: organizer.user.email,
        roles: organizer.user.roles,
      },
    };
  }

  async createOrganizer(createOrganizerDto: CreateOrganizerDto) {
    const tempPassword = randomBytes(8).toString('hex');

    const createUserDto = {
      email: createOrganizerDto.email,
      password: tempPassword,
      role: UserRole.ORGANIZER,
    };
    const user = await this.usersService.create(createUserDto);

    const organizer = this.organizersRepository.create({
      displayName: createOrganizerDto.displayName,
      description: createOrganizerDto.description,
      contactEmail: createOrganizerDto.contactEmail,
      phone: createOrganizerDto.phone,
      user,
    });

    await this.organizersRepository.save(organizer);

    const token = randomBytes(32).toString('hex');
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    await this.passwordTokenService.create({
      token,
      expiry,
      isUsed: false,
      userId: user.id,
    });

    const link = `${process.env.CLIENT_URL}/set-password?token=${token}`;
    await this.mailService.sendSetPasswordEmail(user.email, link);

    return organizer;
  }

  async getAllOrganizers() {
    const organizers = await this.organizersRepository.find({
      relations: ['user'],
    });
    if (!organizers) throw new NotFoundException('No organizers found.');
    return organizers.map((organizer) =>
      this.mapToOrganizerResponse(organizer),
    );
  }

  async getOrganizerById(id: number) {
    const organizer = await this.organizersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!organizer) throw new NotFoundException('Organizer not found.');
    return this.mapToOrganizerResponse(organizer);
  }

  async getOrganizerByUserId(userId: string) {
    const organizer = await this.organizersRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found.');
    }
    return this.mapToOrganizerResponse(organizer);
  }

  async getOrganizerEntityByUserId(userId: string) {
    const organizer = await this.organizersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found.');
    }

    return organizer;
  }

  async getMyStatistics(userId: string): Promise<OrganizerStatisticsDto> {
    const organizer = await this.getOrganizerEntityByUserId(userId);

    const [
      totalEvents,
      activeEvents,
      finishedEvents,
      totalTicketsSold,
      totalRevenue,
      ticketsPerEvent,
      ticketsPerDay,
    ] = await Promise.all([
      this.eventsService.countByOrganizer(organizer.id),
      this.eventsService.countActiveByOrganizer(organizer.id),
      this.eventsService.countFinishedByOrganizer(organizer.id),
      this.ticketsService.countSoldByOrganizer(organizer.id),
      this.ticketsService.getRevenueByOrganizer(organizer.id),
      this.ticketsService.getTicketsPerEvent(organizer.id),
      this.ticketsService.getTicketsPerDay(organizer.id),
    ]);

    return {
      totalEvents,
      activeEvents,
      finishedEvents,
      totalTicketsSold,
      totalRevenue,
      ticketsPerEvent,
      ticketsPerDay,
    };
  }
}
