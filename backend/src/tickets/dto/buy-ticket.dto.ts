import { IsInt, Min } from 'class-validator';

export class BuyTicketsDto {
  @IsInt()
  eventId: number;

  @IsInt()
  ticketTypeId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
