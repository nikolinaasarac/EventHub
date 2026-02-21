import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Get()
  getAllOrganizers() {
    return this.organizersService.getAllOrganizers();
  }

  @Get('my-statistics')
  @UseGuards(JwtAuthGuard)
  getMyStatistics(@CurrentUser() user: User) {
    console.log(user.id);
    return this.organizersService.getMyStatistics(user.id);
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
