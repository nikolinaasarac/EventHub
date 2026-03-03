import {User} from "@/models/user.model";

export interface Organizer {
	id: number
	displayName: string
	description: string
	contactEmail: string
	phone: string
	createdAt: string
	user: User
}