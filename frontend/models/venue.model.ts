import {City} from "@/models/city.model";
import {VenueType} from "@/models/venue-type.model";

export interface Venue {
	id: number
	name: string
	description: string
	address: string
	city: City
	venueType: VenueType
	latitude: string
	longitude: string
	capacity: number
	imageUrl: string
	createdAt: string
	updatedAt: string
	phone: string
	websiteUrl: string
	email: string
	facebook: string
	instagram: string
	amenities: string[]
}