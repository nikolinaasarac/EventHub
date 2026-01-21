import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { Repository } from 'typeorm';
import { CitiesService } from '../cities/cities.service';
import { VenueTypesService } from '../venue-types/venue-types.service';
import { PaginationDto } from '../../shared/pagination/pagination.dto';
import { paginate } from '../../shared/pagination/pagination-helper';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venuesRepository: Repository<Venue>,
    private readonly citiesService: CitiesService,
    private readonly venueTypesService: VenueTypesService,
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    const city = await this.citiesService.findOne(createVenueDto.cityId);
    const venueType = await this.venueTypesService.findOne(
      createVenueDto.venueTypeId,
    );

    if (!city) {
      throw new NotFoundException(
        `City with id ${createVenueDto.cityId} ot found`,
      );
    }

    if (!venueType) {
      throw new NotFoundException(
        `Venue type with id ${createVenueDto.venueTypeId} ot found`,
      );
    }

    const venue = this.venuesRepository.create({
      ...createVenueDto,
      city,
      venueType,
    });
    return await this.venuesRepository.save(venue);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    console.log(limit);
    console.log(page);
    const [data, total] = await this.venuesRepository.findAndCount({
      take: limit,
      skip: limit * (page - 1),
      relations: {
        city: true,
        venueType: true,
      },
    });

    return paginate(data, total, page, limit);
  }

  async findOne(id: number) {
    return await this.venuesRepository.findOne({
      where: { id },
      relations: {
        city: true,
        venueType: true,
      },
    });
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const venue = await this.findOne(id);
    if (!venue) throw new NotFoundException(`Venue with id ${id} not found`);

    Object.assign(venue, updateVenueDto);
    return await this.venuesRepository.save(venue);
  }

  async remove(id: number) {
    const venue = await this.findOne(id);
    if (!venue) throw new NotFoundException(`Venue with id ${id} not found`);
    return await this.venuesRepository.remove(venue);
  }
}
