import { Body, Controller, Post} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { BuyTicketsDto } from './dto/buy-ticket.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Roles(UserRole.VISITOR)
  @Post('buy')
  buyTickets(@Body() dto: BuyTicketsDto, @CurrentUser() user: User) {
    return this.ticketsService.buyTickets(dto, user);
  }
}
