import { PaginationDto } from './pagination/pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CommaSeparatedStringArray } from './decorators/comma-separated-string.decorator';
import { EventStatus } from './enums/event-status.enum';

export class ParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @CommaSeparatedStringArray()
  categories?: string[];

  @IsOptional()
  @CommaSeparatedStringArray()
  cities?: string[];

  @IsOptional()
  @CommaSeparatedStringArray()
  venueTypes?: string[];

  @IsOptional()
  from?: Date;

  @IsOptional()
  to?: Date;

  @IsOptional()
  @CommaSeparatedStringArray()
  @IsEnum(EventStatus, { each: true })
  status?: EventStatus[];
}
