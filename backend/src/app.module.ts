import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypesModule } from './event-types/event-types.module';
import { CitiesModule } from './cities/cities.module';
import { VenuesModule } from './venues/venues.module';
import { VenueTypesModule } from './venue-types/venue-types.module';
import { EventsModule } from './events/events.module';
import typeormConfig from './config/typeorm';
import Joi from 'joi';
import { EventCategoriesModule } from './event-categories/event-categories.module';
import { EventSubcategoriesModule } from './event-subcategories/event-subcategories.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { TicketTypesModule } from './ticket-types/ticket-types.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TicketsModule } from './tickets/tickets.module';
import { MailModule } from './email/mail.module';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      validationSchema: Joi.object({
        RDS_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm')!,
    }),
    EventTypesModule,
    CitiesModule,
    VenuesModule,
    VenueTypesModule,
    EventsModule,
    EventCategoriesModule,
    EventSubcategoriesModule,
    AmenitiesModule,
    TicketTypesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ReviewsModule,
    TicketsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
