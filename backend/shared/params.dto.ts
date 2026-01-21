import { PaginationDto } from './pagination/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class ParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
