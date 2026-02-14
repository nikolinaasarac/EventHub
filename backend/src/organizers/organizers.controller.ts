import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Get()
  getAllOrganizers() {
    return this.organizersService.getAllOrganizers();
  }

  @Get(':id')
  getOrganizerById(@Param('id') id: number) {
    return this.organizersService.getOrganizerById(id);
  }

  @Post()
  createOrganizer(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.createOrganizer(createOrganizerDto);
  }
}
