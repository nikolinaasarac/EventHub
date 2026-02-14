export interface CreateOrganizerDto {
	email: string,
	password: string,
	displayName: string,
	description?: string,
	contactEmail?: string,
	phone?: string
}