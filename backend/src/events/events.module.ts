import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventSubcategoriesModule } from '../event-subcategories/event-subcategories.module';
import { VenuesModule } from '../venues/venues.module';
import { OrganizersModule } from '../organizers/organizers.module';
import { EventsCron } from './events.cron';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    EventSubcategoriesModule,
    VenuesModule,
    OrganizersModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsCron],
  exports: [EventsService],
})
export class EventsModule {}
