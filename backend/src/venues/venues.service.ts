import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { Repository } from 'typeorm';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venuesRepository: Repository<Venue>,
    private readonly citiesService: CitiesService,
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    const city = await this.citiesService.findOne(createVenueDto.cityId);

    if (!city) {
      throw new NotFoundException(
        `City with id ${createVenueDto.cityId} ot found`,
      );
    }

    const venue = this.venuesRepository.create({ ...createVenueDto, city });
    return await this.venuesRepository.save(venue);
  }

  async findAll() {
    return await this.venuesRepository.find({
      relations: {
        city: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.venuesRepository.findOne({
      where: { id },
      relations: {
        city: true,
      },
    });
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const venue = await this.findOne(id);
    if (!venue) throw new NotFoundException(`Venue with id ${id} not found`);

    console.log(updateVenueDto);
    Object.assign(venue, updateVenueDto);
    await this.venuesRepository.save(venue);

    return await this.venuesRepository.save(venue);
  }

  async remove(id: number) {
    const venue = await this.findOne(id);
    if (!venue) throw new NotFoundException(`Venue with id ${id} not found`);
    return await this.venuesRepository.remove(venue);
  }
}
