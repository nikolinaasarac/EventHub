import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTicketPurchaseEmail(user: User, quantity: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Uspješna kupovina karata 🎟️',
      text: `Zdravo,

Uspješno ste kupili ${quantity} karata.

Hvala što koristite EventHub!`,
    });
  }
}
