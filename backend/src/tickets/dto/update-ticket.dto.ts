import { PartialType } from '@nestjs/mapped-types';
import { BuyTicketsDto } from './buy-ticket.dto';

export class UpdateTicketDto extends PartialType(BuyTicketsDto) {}
