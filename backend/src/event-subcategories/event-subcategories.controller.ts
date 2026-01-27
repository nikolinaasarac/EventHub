import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventSubcategoriesService } from './event-subcategories.service';
import { CreateEventSubcategoryDto } from './dto/create-event-subcategory.dto';
import { UpdateEventSubcategoryDto } from './dto/update-event-subcategory.dto';

@Controller('event-subcategories')
export class EventSubcategoriesController {
  constructor(
    private readonly subcategoriesService: EventSubcategoriesService,
  ) {}

  @Post()
  create(@Body() createEventSubcategoryDto: CreateEventSubcategoryDto) {
    return this.subcategoriesService.create(createEventSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventSubcategoryDto: UpdateEventSubcategoryDto,
  ) {
    return this.subcategoriesService.update(+id, updateEventSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
