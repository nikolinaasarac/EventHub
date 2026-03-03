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
    const reviews = await this.reviewRepository.find({
      where: { event: { id: eventId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const averageRating =
      reviews.length === 0
        ? 0
        : Number(
            (
              reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            ).toFixed(1),
          );

    const starsCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      const star = Math.round(r.rating);
      starsCount[star] = (starsCount[star] || 0) + 1;
    });

    return {
      reviews,
      averageRating,
      starsCount,
    };
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
