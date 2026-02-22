import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePasswordTokenDto } from './dto/create-password-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordToken } from './entity/password-token';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PasswordTokensService {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepository: Repository<PasswordToken>,
    private readonly userService: UsersService,
  ) {}

  async create(createPasswordTokenDto: CreatePasswordTokenDto) {
    const user = await this.userService.findOne(createPasswordTokenDto.userId);

    if (!user) {
      throw new BadRequestException('User not found for given userId');
    }

    const passwordToken = this.passwordTokenRepository.create({
      token: createPasswordTokenDto.token,
      expiry: createPasswordTokenDto.expiry,
      isUsed: createPasswordTokenDto.isUsed,
      user,
    });

    return this.passwordTokenRepository.save(passwordToken);
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
