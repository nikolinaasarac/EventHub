import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordToken } from './entity/password-token';
import { PasswordTokensService } from './password-tokens.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordToken]), UsersModule],
  providers: [PasswordTokensService],
  exports: [PasswordTokensService],
})
export class PasswordTokensModule {}
