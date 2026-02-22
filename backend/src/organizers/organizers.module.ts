import { forwardRef, Module } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { OrganizersController } from './organizers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { TicketsModule } from '../tickets/tickets.module';
import { PasswordTokensModule } from '../password-tokens/password-tokens.module';
import { MailModule } from '../email/mail.module';
import { MailService } from '../email/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organizer]),
    UsersModule,
    TicketsModule,
    forwardRef(() => EventsModule),
    PasswordTokensModule,
  ],
  controllers: [OrganizersController],
  providers: [OrganizersService, MailService],
  exports: [OrganizersService],
})
export class OrganizersModule {}
