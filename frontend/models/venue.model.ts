import {City} from "@/models/city.model";

export interface Venue {
	id: number
	name: string
	description: string
	address: string
	city: City
	latitude: string
	longitude: string
	capacity: number
	imageUrl: string
	createdAt: string
	updatedAt: string
}