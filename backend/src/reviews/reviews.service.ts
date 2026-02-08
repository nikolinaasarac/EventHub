import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../users/entities/user.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly eventsService: EventsService,
  ) {}

  async create(dto: CreateReviewDto, user: User) {
    const event = await this.eventsService.findOne(dto.eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const review = this.reviewRepository.create({
      rating: dto.rating,
      comment: dto.comment,
      user,
      event,
    });

    return this.reviewRepository.save(review);
  }

  async findAll() {
    return this.reviewRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async findByEvent(eventId: number) {
    return this.reviewRepository.find({
      where: { event: { id: eventId } },
      relations: ['user', 'event'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, dto: UpdateReviewDto) {
    const review = await this.findOne(id);

    Object.assign(review, dto);

    return this.reviewRepository.save(review);
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
    return { deleted: true };
  }
}
