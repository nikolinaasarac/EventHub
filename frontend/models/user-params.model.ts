import {Pagination} from "@/models/paginated.model";
import {UserRole} from "@/shared/enums/user-role.enum";

export interface UserParams extends Pagination {
	search?: string
	roles?: UserRole;
}