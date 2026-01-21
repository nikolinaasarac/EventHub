import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PaginationDto } from '../../shared/pagination/pagination.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.venuesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(+id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }
}
