import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
