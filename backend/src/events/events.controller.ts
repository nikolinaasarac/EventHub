import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ParamsDto } from '../../shared/params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/auth.types';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(UserRole.ORGANIZER)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `image-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
    @Req() req: AuthRequest,
  ) {
    const imageUrl = file ? `uploads/${file.filename}` : undefined;
    return this.eventsService.create(createEventDto, req.user['id'], imageUrl);
  }

  @Public()
  @Get()
  findAll(@Query() paramsDto: ParamsDto) {
    return this.eventsService.findAll(paramsDto);
  }

  @Public()
  @Get('all-events')
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Roles(UserRole.ORGANIZER)
  @Get('my-events')
  @UseGuards(JwtAuthGuard)
  getMyOrganizedEvents(@CurrentUser() user: User, @Query() params: ParamsDto) {
    return this.eventsService.getMyOrganizedEvents(user, params);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Public()
  @Get('my-events/:organizerId')
  @UseGuards(JwtAuthGuard)
  getEventsByOrganizer(
    @Param('organizerId') organizerId: string,
    @Query() params: ParamsDto,
  ) {
    return this.eventsService.getOrganizerEvents(organizerId, params);
  }

  @Roles(UserRole.ORGANIZER)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `image-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.eventsService.update(+id, updateEventDto, file);
  }

  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
