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
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ParamsDto } from '../../shared/params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateVenueDto } from './dto/create-venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

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
    @Body() body: CreateVenueDto,
  ) {
    const imageUrl = file ? `uploads/${file.filename}` : undefined;
    return this.venuesService.create(body, imageUrl);
  }

  @Get()
  findAll(@Query() paramsDto: ParamsDto) {
    return this.venuesService.findAll(paramsDto);
  }

  @Get('get-all')
  findAllVenues() {
    return this.venuesService.findAllVenues();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(+id);
  }

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
    @Body() updateVenueDto: UpdateVenueDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.venuesService.update(+id, updateVenueDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }
}
