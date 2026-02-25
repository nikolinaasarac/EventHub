import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventsService } from './events.service';

@Injectable()
export class EventsCron {
  constructor(private readonly eventsService: EventsService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateRentalStatuses() {
    await this.eventsService.updateEventStatuses();
  }
}
