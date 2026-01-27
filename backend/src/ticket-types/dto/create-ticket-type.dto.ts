export class CreateTicketTypeDto {
  name: string;
  price: number;
  totalQuantity: number;
  isActive?: boolean;
  eventId: number;
}
