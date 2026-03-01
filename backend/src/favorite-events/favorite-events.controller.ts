import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ParamsDto } from '../../shared/params.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('favorite-events')
export class FavoriteEventsController {
  constructor(private readonly favoriteEventsService: FavoriteEventsService) {}

  @Roles(UserRole.VISITOR)
  @Get()
  getMyFavorites(@CurrentUser() user: User) {
    return this.favoriteEventsService.getUserFavorites(user);
  }

  @Roles(UserRole.VISITOR)
  @Get('/paginated')
  getMyFavoritesPaginated(
    @CurrentUser() user: User,
    @Query() params: ParamsDto,
  ) {
    return this.favoriteEventsService.getUserFavoritesPaginated(user, params);
  }

  @Roles(UserRole.VISITOR)
  @Post(':eventId')
  addToFavorites(@Param('eventId') eventId: string, @CurrentUser() user: User) {
    return this.favoriteEventsService.addToFavorites(user, eventId);
  }

  @Roles(UserRole.VISITOR)
  @Delete(':eventId')
  removeFromFavorites(
    @Param('eventId') eventId: string,
    @CurrentUser() user: User,
  ) {
    return this.favoriteEventsService.removeFromFavorites(user, eventId);
  }
}
