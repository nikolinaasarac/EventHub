import { PaginationDto } from './pagination/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map(Number)
      : String(value).split(',').map(Number),
  )
  categories?: string[];
}
