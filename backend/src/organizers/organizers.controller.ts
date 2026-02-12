import { Controller, Post, Body } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  createOrganizer(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.createOrganizer(createOrganizerDto);
  }
}
