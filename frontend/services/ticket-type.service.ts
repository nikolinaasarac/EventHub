import BaseService from "@/services/base.service";

type CreateTicketTypePayload = {
	name: string;
	price: number;
	totalQuantity: number;
	eventId: number;
};

export default class TicketTypeService {
	static readonly ENDPOINT = "/ticket-types";

	static async createTicketType(payload: CreateTicketTypePayload) {
		return BaseService.create(this.ENDPOINT, payload);
	}
}