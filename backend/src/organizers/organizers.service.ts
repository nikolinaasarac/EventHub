import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRole } from '../../shared/enums/user-role.enum';
import { ParamsDto } from '../../shared/params.dto';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizersRepository: Repository<Organizer>,
    private readonly usersService: UsersService,
  ) {}

  private mapToOrganizerResponse(organizer: Organizer) {
    return {
      id: organizer.id,
      displayName: organizer.displayName,
      description: organizer.description,
      contactEmail: organizer.contactEmail,
      phone: organizer.phone,
      createdAt: organizer.createdAt,
      user: {
        id: organizer.user.id,
        email: organizer.user.email,
        roles: organizer.user.roles,
      },
    };
  }

  async createOrganizer(createOrganizerDto: CreateOrganizerDto) {
    const createUserDto = {
      email: createOrganizerDto.email,
      password: createOrganizerDto.password,
      role: UserRole.ORGANIZER,
    };
    const user = await this.usersService.create(createUserDto);

    const organizer = this.organizersRepository.create({
      displayName: createOrganizerDto.displayName,
      description: createOrganizerDto.description,
      contactEmail: createOrganizerDto.contactEmail,
      phone: createOrganizerDto.phone,
      user,
    });

    return this.organizersRepository.save(organizer);
  }

  async getAllOrganizers() {
    const organizers = await this.organizersRepository.find({
      relations: ['user'],
    });
    if (!organizers) throw new NotFoundException('No organizers found.');
    return organizers.map((organizer) =>
      this.mapToOrganizerResponse(organizer),
    );
  }

  async getOrganizerById(id: number) {
    const organizer = await this.organizersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!organizer) throw new NotFoundException('Organizer not found.');
    return this.mapToOrganizerResponse(organizer);
  }

  async getOrganizerByUserId(userId: string) {
    const organizer = await this.organizersRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found.');
    }
    return this.mapToOrganizerResponse(organizer);
  }

  async getOrganizerEntityByUserId(userId: string) {
    const organizer = await this.organizersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found.');
    }

    return organizer;
  }
}
