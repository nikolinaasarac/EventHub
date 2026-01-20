import { PartialType } from '@nestjs/mapped-types';
import { CreateEventSubcategoryDto } from './create-event-subcategory.dto';

export class UpdateEventSubcategoryDto extends PartialType(CreateEventSubcategoryDto) {}
