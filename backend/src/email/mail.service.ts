import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { TicketPdfService } from '../tickets/ticket-pdf.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly ticketPdfService: TicketPdfService,
  ) {}

  async sendTicketPurchaseEmail(user: User, tickets: Ticket[]) {
    const pdfBuffer = await this.ticketPdfService.generateTicketPdf(tickets);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Uspješna kupovina karata 🎟️',
      template: 'ticket-purchase',
      context: {
        eventTitle: tickets[0].ticketType.event.title,
        ticketCount: tickets.length,
      },
      attachments: [
        {
          filename: 'tickets.pdf',
          content: pdfBuffer,
        },
      ],
    });
  }
}
