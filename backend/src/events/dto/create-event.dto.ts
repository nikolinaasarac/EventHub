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
import { Transform } from 'class-transformer';
import { EmptyStringToNull } from '../../../shared/decorators/empty-string-to-null.decorator';

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
  @EmptyStringToNull()
  imageUrl?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Record<string, unknown>;
      } catch (err) {
        return undefined;
      }
    }
    return value as Record<string, unknown>;
  })
  metadata?: Record<string, unknown>;
}
