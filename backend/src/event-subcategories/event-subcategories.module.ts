import { Module } from '@nestjs/common';
import { EventSubcategoriesService } from './event-subcategories.service';
import { EventSubcategoriesController } from './event-subcategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSubcategory } from './entities/event-subcategory.entity';
import { EventCategoriesModule } from '../event-categories/event-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventSubcategory]),
    EventCategoriesModule,
  ],
  controllers: [EventSubcategoriesController],
  providers: [EventSubcategoriesService],
  exports: [EventSubcategoriesService],
})
export class EventSubcategoriesModule {}
