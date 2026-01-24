export interface CreateVenueDto {
	name: string;
	description: string;
	address: string;
	cityId: number | undefined;
	venueTypeId: number | undefined;
	latitude?: number | undefined;
	longitude?: number | undefined;
	capacity?: number | string;
	imageUrl: string;
	phone?: string;
	email?: string;
	websiteUrl?: string;
	instagram?: string;
	facebook?: string;
}