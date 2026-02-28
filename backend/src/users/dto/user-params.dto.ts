import { IsOptional, IsString } from 'class-validator';
import { CommaSeparatedStringArray } from '../../../shared/decorators/comma-separated-string.decorator';
import { PaginationDto } from '../../../shared/pagination/pagination.dto';
import { UserRole } from '../../../shared/enums/user-role.enum';

export class UsersParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @CommaSeparatedStringArray()
  roles?: UserRole[];
}
