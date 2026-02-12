import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateOrganizerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: Role[];

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
