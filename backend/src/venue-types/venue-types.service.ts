import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue-type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenueType } from './entities/venue-type.entity';

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectRepository(VenueType)
    private readonly venueTypeRepository: Repository<VenueType>,
  ) {}

  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const venueType = this.venueTypeRepository.create(createVenueTypeDto);
    return await this.venueTypeRepository.save(venueType);
  }

  async findAll() {
    return await this.venueTypeRepository.find();
  }

  async findOne(id: number) {
    const venueType = await this.venueTypeRepository.findOne({ where: { id } });
    if (!venueType)
      throw new NotFoundException(`Venue type with id ${id} not found`);
    return venueType;
  }

  async update(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    const venueType = await this.findOne(id);
    if (!venueType)
      throw new NotFoundException(`Venue type with id ${id} not found`);
    Object.assign(venueType, updateVenueTypeDto);
    return this.venueTypeRepository.save(venueType);
  }

  async remove(id: number) {
    const venueType = await this.findOne(id);
    if (!venueType)
      throw new NotFoundException(`Venue type with id ${id} not found`);
    return this.venueTypeRepository.delete(id);
  }
}
