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
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('event-subcategories')
export class EventSubcategoriesController {
  constructor(
    private readonly subcategoriesService: EventSubcategoriesService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createEventSubcategoryDto: CreateEventSubcategoryDto) {
    return this.subcategoriesService.create(createEventSubcategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventSubcategoryDto: UpdateEventSubcategoryDto,
  ) {
    return this.subcategoriesService.update(+id, updateEventSubcategoryDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
