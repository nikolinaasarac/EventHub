import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;

  @IsNumber()
  eventId: number;
}
