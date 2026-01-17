import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVenueTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
