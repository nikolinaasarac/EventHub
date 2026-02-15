import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('favorite-events')
export class FavoriteEventsController {
  constructor(private readonly favoriteEventsService: FavoriteEventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyFavorites(@CurrentUser() user: User) {
    return this.favoriteEventsService.getUserFavorites(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':eventId')
  addToFavorites(@Param('eventId') eventId: string, @CurrentUser() user: User) {
    return this.favoriteEventsService.addToFavorites(user, eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  removeFromFavorites(
    @Param('eventId') eventId: string,
    @CurrentUser() user: User,
  ) {
    return this.favoriteEventsService.removeFromFavorites(user, eventId);
  }
}
