import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteEvent } from './entities/favorite-event.entity';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FavoriteEventsService {
  constructor(
    @InjectRepository(FavoriteEvent)
    private favoriteEventRepository: Repository<FavoriteEvent>,
    private readonly userService: UsersService,
    private readonly eventService: EventsService,
  ) {}

  async addToFavorites(user: User, eventId: string) {
    const event = await this.eventService.findOne(+eventId);

    if (!event) throw new NotFoundException('Event not found');

    const existing = await this.favoriteEventRepository.findOne({
      where: {
        user: { id: user.id },
        event: { id: +eventId },
      },
      relations: ['user', 'event'],
    });

    if (existing) throw new ConflictException('Event already in favorites');

    const favorite = this.favoriteEventRepository.create({
      user,
      event,
    });
    return this.favoriteEventRepository.save(favorite);
  }

  async removeFromFavorites(user: User, eventId: string) {
    const favorite = await this.favoriteEventRepository.findOne({
      where: {
        user: { id: user.id },
        event: { id: +eventId },
      },
      relations: ['user', 'event'],
    });

    if (!favorite) throw new NotFoundException('Favorite not found');

    await this.favoriteEventRepository.remove(favorite);

    return { message: 'Removed from favorites' };
  }

  async getUserFavorites(user: User) {
    const favorites = await this.favoriteEventRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['event'],
      order: {
        createdAt: 'DESC',
      },
    });

    return favorites.map((f) => f.event);
  }
}
