import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEventCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}