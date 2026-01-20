import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EventStatus } from '../../../shared/enums/event-status.enum';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @IsNotEmpty()
  venueId: number;

  @IsInt()
  @IsNotEmpty()
  eventSubcategoryId: number;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  metadata?: Record<string, unknown>;
}
