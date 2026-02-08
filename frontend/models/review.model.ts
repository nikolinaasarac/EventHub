import {User} from "@/models/user.model";

export interface Review {
	id: string,
	rating: number,
	comment: string,
	createdAt: string,
	user: User
	eventId: number
}