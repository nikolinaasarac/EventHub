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
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  phone?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  email?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(150)
  websiteUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  instagram?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  facebook?: string;
}
