import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordToken } from './entity/password-token';
import { PasswordTokensService } from './password-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordToken])],
  providers: [PasswordTokensService],
  exports: [PasswordTokensService],
})
export class PasswordTokensModule {}
