import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import PDFDocument from 'pdfkit';
import { Ticket } from '../tickets/entities/ticket.entity';
import * as QRCode from 'qrcode';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async generateTicketPdf(tickets: Ticket[]): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 0 });
      const buffers: Uint8Array[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const colors = {
        primary: '#4F46E5',
        slate900: '#0F172A',
        slate500: '#64748B',
        slate50: '#F8FAFC',
        white: '#FFFFFF',
      };

      for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];

        if (i > 0) doc.addPage();

        doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.slate50);

        const cardWidth = 400;
        const cardHeight = 600;
        const x = (doc.page.width - cardWidth) / 2;
        const y = 100;

        doc
          .roundedRect(x + 5, y + 5, cardWidth, cardHeight, 20)
          .fill('#E2E8F0');

        doc.roundedRect(x, y, cardWidth, cardHeight, 20).fill(colors.white);

        doc
          .path(
            `M ${x + 20} ${y} L ${x + cardWidth - 20} ${y} Q ${x + cardWidth} ${y} ${x + cardWidth} ${y + 20} L ${x + cardWidth} ${y + 120} L ${x} ${y + 120} L ${x} ${y + 20} Q ${x} ${y} ${x + 20} ${y} Z`,
          )
          .fill(colors.primary);

        const fontRegular = join(process.cwd(), 'assets/fonts/Roboto.ttf');
        const fontBold = join(process.cwd(), 'assets/fonts/Roboto-Bold.ttf');

        doc.registerFont('MainFont', fontRegular);
        doc.registerFont('MainFontBold', fontBold);

        doc
          .fillColor(colors.white)
          .fontSize(22)
          .font('MainFontBold')
          .text('EVENTIFY', x + 30, y + 40, { characterSpacing: 2 });

        doc
          .fontSize(10)
          .font('MainFont')
          .text('ZVANIČNA ULAZNICA', x + 30, y + 70, {});

        const contentY = y + 150;

        doc
          .fillColor(colors.slate900)
          .fontSize(20)
          .font('MainFont')
          .text(ticket.event.title, x + 30, contentY, {
            width: cardWidth - 60,
          });

        const badgeY = contentY + 45;
        doc.roundedRect(x + 30, badgeY, 100, 20, 5).fill('#EEF2FF');
        doc
          .fillColor(colors.primary)
          .fontSize(8)
          .font('MainFontBold')
          .text(
            ticket.event.eventSubcategory?.name.toUpperCase() || '',
            x + 30,
            badgeY + 6,
            { width: 100, align: 'center' },
          );

        const gridY = badgeY + 50;

        const drawInfo = (
          label: string,
          value: string,
          posX: number,
          posY: number,
        ) => {
          doc
            .fillColor(colors.slate500)
            .fontSize(9)
            .font('MainFont')
            .text(label.toUpperCase(), posX, posY);
          doc
            .fillColor(colors.slate900)
            .fontSize(12)
            .font('MainFontBold')
            .text(value, posX, posY + 15);
        };

        const dateStr = new Date(ticket.event.startDate).toLocaleDateString(
          'sr-Latn-RS',
          { day: '2-digit', month: 'long', year: 'numeric' },
        );
        const timeStr = new Date(ticket.event.startDate).toLocaleTimeString(
          'sr-Latn-RS',
          { hour: '2-digit', minute: '2-digit' },
        );

        drawInfo('Datum', dateStr, x + 30, gridY);
        drawInfo('Vrijeme', timeStr, x + 220, gridY);
        drawInfo(
          'Lokacija',
          ticket.event.venue?.name || '',
          x + 30,
          gridY + 60,
        );
        drawInfo('Tip karte', ticket.ticketType.name, x + 220, gridY + 60);

        const perfY = gridY + 130;
        doc
          .moveTo(x, perfY)
          .lineTo(x + cardWidth, perfY)
          .dash(5, { space: 5 })
          .strokeColor('#CBD5E1')
          .stroke();

        doc.circle(x, perfY, 12).fill(colors.slate50);
        doc.circle(x + cardWidth, perfY, 12).fill(colors.slate50);

        try {
          const qrData = ticket.id;
          const qrBuffer = await QRCode.toBuffer(qrData, {
            margin: 1,
            color: { dark: '#0F172A', light: '#FFFFFF' },
          });
          doc.image(qrBuffer, x + cardWidth / 2 - 60, perfY + 30, {
            width: 120,
          });
        } catch (err) {
          console.error('QR Error:', err);
        }

        doc
          .fillColor(colors.slate500)
          .fontSize(8)
          .font('Courier')
          .text(`ID: ${ticket.id}`, 0, y + cardHeight - 50, {
            align: 'center',
            width: doc.page.width,
          });

        doc
          .fillColor(colors.slate900)
          .fontSize(10)
          .font('MainFontBold')
          .text(
            `CIJENA: ${ticket.ticketType.price} KM`,
            0,
            y + cardHeight - 35,
            {
              align: 'center',
              width: doc.page.width,
            },
          );
      }

      doc.end();
    });
  }

  async sendTicketPurchaseEmail(user: User, tickets: Ticket[]) {
    const pdfBuffer = await this.generateTicketPdf(tickets);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Uspješna kupovina karata 🎟️',
      text: `Zdravo,

Uspješno ste kupili karte za ${tickets[0].ticketType.event.title}. Broj kupljenih karata: ${tickets.length}.
Karte u prilogu. 

Hvala što koristite Eventify!`,
      attachments: [
        {
          filename: 'tickets.pdf',
          content: pdfBuffer,
        },
      ],
    });
  }
}
