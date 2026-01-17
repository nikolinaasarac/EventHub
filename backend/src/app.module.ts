import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypesModule } from './event-types/event-types.module';
import { CitiesModule } from './cities/cities.module';
import typeormConfig from './config/typeorm';
import Joi from 'joi';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
