import { Module } from '@nestjs/common';
import { VenueTypesService } from './venue-types.service';
import { VenueTypesController } from './venue-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueType } from './entities/venue-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueType])],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
  exports: [VenueTypesService],
})
export class VenueTypesModule {}
