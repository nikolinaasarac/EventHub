import {Review} from './review.model';

export interface ReviewData {
	reviews: Review[];
	averageRating: number;
	starsCount: Record<number, number>;
}