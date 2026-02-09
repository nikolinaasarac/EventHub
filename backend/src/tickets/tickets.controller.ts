import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BuyTicketsDto } from './dto/buy-ticket.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  buyTickets(@Body() dto: BuyTicketsDto, @CurrentUser() user: User) {
    return this.ticketsService.buyTickets(dto, user);
  }
}
