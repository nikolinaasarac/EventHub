import BaseService from "@/services/base.service";

type CreateTicket = {
	eventId: number;
	ticketTypeId: number;
	quantity: number;
};

export default class TicketsService {
	static readonly ENDPOINT = "/tickets";

	static async buyTickets(payload: CreateTicket) {
		return BaseService.create(`${this.ENDPOINT}/buy`, payload);
	}
}