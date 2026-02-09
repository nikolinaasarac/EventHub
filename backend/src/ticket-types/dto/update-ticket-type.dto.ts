import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketTypeDto } from './create-ticket-type.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {
  @IsNumber()
  @IsOptional()
  soldQuantity?: number;
}
