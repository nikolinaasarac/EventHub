export interface CreateVenueDto {
	name: string;
	description: string;
	address: string;
	cityId: number | undefined;
	venueTypeId: number | undefined;
	latitude?: number | undefined;
	longitude?: number | undefined;
	capacity?: number | string | null;
	imageUrl: string;
	phone?: string | null;
	email?: string | null;
	websiteUrl?: string | null;
	instagram?: string | null;
	facebook?: string | null;
}