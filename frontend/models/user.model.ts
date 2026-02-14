import {Organizer} from "@/models/organizer.model";

export interface User {
	id: string,
	email: string,
	roles: {
		id: number,
		name: string
	}[]
	organizerProfile?: Organizer
}

export interface LoginResponse {
	user: User
	accessToken: string
}