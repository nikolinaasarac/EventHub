import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  async findAll() {
    return await this.citiesRepository.find();
  }

  async findOne(id: number) {
    return await this.citiesRepository.findOne({ where: { id } });
  }
}
