import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import type { AuthRequest } from '../auth/auth.types';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Roles(UserRole.VISITOR)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: AuthRequest) {
    return this.reviewsService.create(createReviewDto, req.user);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: number) {
    return this.reviewsService.findByEvent(eventId);
  }
}
