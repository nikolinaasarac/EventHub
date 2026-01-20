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

@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategories: EventCategoriesService) {}

  @Post()
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategories.create(createEventCategoryDto);
  }

  @Get()
  findAll() {
    return this.eventCategories.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventCategories.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    return this.eventCategories.update(+id, updateEventCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventCategories.remove(+id);
  }
}
