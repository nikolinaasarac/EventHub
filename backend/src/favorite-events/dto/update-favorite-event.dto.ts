import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteEventDto } from './create-favorite-event.dto';

export class UpdateFavoriteEventDto extends PartialType(CreateFavoriteEventDto) {}
