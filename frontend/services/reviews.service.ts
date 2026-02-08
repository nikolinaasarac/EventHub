import BaseService from "@/services/base.service";
import {Review} from "@/models/review.model";

export default class ReviewsService {
	static readonly ENDPOINT = "/reviews"

	static async getReviewsByEventId(eventId: number): Promise<Review[]> {
		return BaseService.fetchList<Review[]>(`${this.ENDPOINT}/event/${eventId}`);
	}

	static async createReview(review: { comment: string, rating: number, eventId: number }) {
		return BaseService.create(`${this.ENDPOINT}`, review);
	}
}