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
import { applyQueryOptions } from '../../shared/query-builder.helper';
import { ParamsDto } from '../../shared/params.dto';
import { paginate } from '../../shared/pagination/pagination-helper';

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

  async getUserFavoritesPaginated(user: User, params: ParamsDto) {
    const qb = this.favoriteEventRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.event', 'event')
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('event.eventSubcategory', 'eventSubcategory')
      .leftJoinAndSelect('eventSubcategory.eventCategory', 'eventCategory')
      .where('favorite.user.id = :userId', { userId: user.id });

    applyQueryOptions(qb, {
      search: params.search,
      searchFields: ['event.title'],
      page: params.page,
      limit: params.limit,
      order: { 'favorite.createdAt': 'DESC' },
    });

    const [data, total] = await qb.getManyAndCount();
    const events = data.map((fav) => fav.event);
    return paginate(events, total, params.page, params.limit);
  }
}
