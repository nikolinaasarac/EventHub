import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('ticket-types')
export class TicketTypesController {
  constructor(private readonly ticketTypesService: TicketTypesService) {}

  @Roles(UserRole.ORGANIZER)
  @Post()
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypesService.create(createTicketTypeDto);
  }

  @Get()
  findAll() {
    return this.ticketTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTypesService.findOne(+id);
  }

  @Roles(UserRole.ORGANIZER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    return this.ticketTypesService.update(+id, updateTicketTypeDto);
  }

  @Roles(UserRole.ORGANIZER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTypesService.remove(+id);
  }
}
