import { Module } from '@nestjs/common';
import { FavoriteEventsService } from './favorite-events.service';
import { FavoriteEventsController } from './favorite-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEvent } from './entities/favorite-event.entity';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEvent]),
    EventsModule,
    UsersModule,
  ],
  controllers: [FavoriteEventsController],
  providers: [FavoriteEventsService],
  exports: [FavoriteEventsService],
})
export class FavoriteEventsModule {}