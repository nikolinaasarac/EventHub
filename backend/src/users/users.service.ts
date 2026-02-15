import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new NotFoundException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let role: Role | null;

    if (!createUserDto.role) {
      role = await this.rolesService.findByName('Posjetilac');

      if (!role) {
        throw new NotFoundException('Default role Posjetilac not found');
      }
    } else {
      role = await this.rolesService.findByName(createUserDto.role);

      if (!role) {
        throw new NotFoundException(
          `Role ${createUserDto.role} does not exist`,
        );
      }
    }

    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      roles: [role],
    });

    return await this.usersRepository.save(user);
  }

  async createWithRole(
    email: string,
    password: string,
    roleName: string,
  ): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new NotFoundException(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.rolesService.findByName(roleName);

    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      roles: [role],
    });

    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find({
      relations: ['organizerProfile', 'roles'],
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    return await this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }
}
