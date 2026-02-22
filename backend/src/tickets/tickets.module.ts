import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketTypesModule } from '../ticket-types/ticket-types.module';
import { EventsModule } from '../events/events.module';
import { MailService } from '../email/mail.service';
import { TicketPdfService } from './ticket-pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    TicketTypesModule,
    forwardRef(() => EventsModule),
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketPdfService, MailService],
  exports: [TicketsService, TicketPdfService],
})
export class TicketsModule {}
