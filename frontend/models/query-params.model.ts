import {Pagination} from "@/models/paginated.model";

export interface QueryParams extends Pagination {
	search?: string
	categories?: string;
	cities?: string;
	venueTypes?: string;
	from?: string;
	to?: string;
}