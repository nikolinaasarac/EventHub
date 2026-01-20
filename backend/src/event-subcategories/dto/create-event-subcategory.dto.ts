import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
