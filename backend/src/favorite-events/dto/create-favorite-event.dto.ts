import { IsNumber } from 'class-validator';

export class CreateFavoriteEventDto {
  @IsNumber()
  eventId: number;
}
