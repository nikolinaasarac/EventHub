import { Injectable } from '@nestjs/common';
import { CreatePasswordTokenDto } from './dto/create-password-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordToken } from './entity/password-token';

@Injectable()
export class PasswordTokensService {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenService: Repository<PasswordToken>,
  ) {}

  async create(createPasswordTokenDto: CreatePasswordTokenDto) {
    const passwordToken = this.passwordTokenService.create(
      createPasswordTokenDto,
    );
    return await this.passwordTokenService.save(passwordToken);
  }
}
