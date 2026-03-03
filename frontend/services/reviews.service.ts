import BaseService from "@/services/base.service";
import {Review} from "@/models/review.model";
import {ReviewData} from "@/models/review-data.model";

export default class ReviewsService {
	static readonly ENDPOINT = "/reviews"

	static async getReviewsByEventId(eventId: number): Promise<ReviewData> {
		return BaseService.fetchList<ReviewData>(`${this.ENDPOINT}/event/${eventId}`);
	}

	static async createReview(review: { comment: string, rating: number, eventId: number }) {
		return BaseService.create(`${this.ENDPOINT}`, review);
	}
}