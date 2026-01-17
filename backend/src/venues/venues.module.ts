import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venue]), CitiesModule],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
