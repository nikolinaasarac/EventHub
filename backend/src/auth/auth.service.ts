import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.name),
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async generateAndSaveRefreshToken(user: User) {
    const token = this.generateRefreshToken();

    const refreshToken = this.refreshTokenRepository.create({
      token,
      user,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    await this.refreshTokenRepository.save(refreshToken);
    return token;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new NotFoundException('Invalid credentials');

    const accessToken = this.createToken(user);
    const refreshToken = await this.generateAndSaveRefreshToken(user);
    const userResponse = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      userResponse,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (!token) return false;
    token.revoked = true;
    await this.refreshTokenRepository.save(token);
    return true;
  }
}
