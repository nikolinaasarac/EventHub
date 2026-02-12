import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizersRepository: Repository<Organizer>,
    private readonly usersService: UsersService,
  ) {}

  async createOrganizer(createOrganizerDto: CreateOrganizerDto) {
    const user = await this.usersService.createWithRole(
      createOrganizerDto.email,
      createOrganizerDto.password,
      'Organizator',
    );

    const organizer = this.organizersRepository.create({
      displayName: createOrganizerDto.displayName,
      description: createOrganizerDto.description,
      contactEmail: createOrganizerDto.contactEmail,
      phone: createOrganizerDto.phone,
      user,
    });

    return this.organizersRepository.save(organizer);
  }
}
