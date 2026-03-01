import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  getAllOrganizers() {
    return this.organizersService.getAllOrganizers();
  }

  @Roles(UserRole.ORGANIZER)
  @Get('my-statistics')
  getMyStatistics(@CurrentUser() user: User) {
    console.log(user.id);
    return this.organizersService.getMyStatistics(user.id);
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  getOrganizerById(@Param('id') id: number) {
    return this.organizersService.getOrganizerById(id);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  createOrganizer(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.createOrganizer(createOrganizerDto);
  }
}
