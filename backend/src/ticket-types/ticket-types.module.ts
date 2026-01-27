import { Module } from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { TicketTypesController } from './ticket-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketType } from './entities/ticket-type.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketType]), EventsModule],
  controllers: [TicketTypesController],
  providers: [TicketTypesService],
})
export class TicketTypesModule {}
