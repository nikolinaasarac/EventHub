import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategories: EventCategoriesService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategories.create(createEventCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.eventCategories.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventCategories.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    return this.eventCategories.update(+id, updateEventCategoryDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventCategories.remove(+id);
  }
}
