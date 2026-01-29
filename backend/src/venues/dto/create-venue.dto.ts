import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EmptyStringToNull } from '../../../shared/decorators/empty-string-to-null.decorator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  cityId: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  venueTypeId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  capacity?: number;

  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  @MaxLength(150)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @EmptyStringToNull()
  email?: string | null;

  @IsOptional()
  @IsUrl()
  @EmptyStringToNull()
  websiteUrl?: string | null;

  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  @MaxLength(150)
  instagram?: string;

  @IsString()
  @IsOptional()
  @EmptyStringToNull()
  @MaxLength(150)
  facebook?: string;
}
