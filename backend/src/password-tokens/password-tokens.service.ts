import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePasswordTokenDto } from './dto/create-password-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordToken } from './entity/password-token';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PasswordTokensService {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepository: Repository<PasswordToken>,
  ) {}

  async create(createPasswordTokenDto: CreatePasswordTokenDto) {
    const passwordToken = this.passwordTokenRepository.create(
      createPasswordTokenDto,
    );
    return await this.passwordTokenRepository.save(passwordToken);
  }

  async validateToken(token: string): Promise<User> {
    const passwordToken = await this.passwordTokenRepository.findOne({
      where: { token, isUsed: false },
      relations: ['user'],
    });

    if (!passwordToken) {
      throw new BadRequestException('Invalid token');
    }

    if (passwordToken.expiry < new Date()) {
      throw new BadRequestException('Token expired');
    }

    return passwordToken.user;
  }

  async markAsUsed(token: string): Promise<void> {
    const passwordToken = await this.passwordTokenRepository.findOne({
      where: { token },
    });

    if (passwordToken) {
      passwordToken.isUsed = true;
      await this.passwordTokenRepository.save(passwordToken);
    }
  }
}
