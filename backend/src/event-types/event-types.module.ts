import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';

@Module({
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
