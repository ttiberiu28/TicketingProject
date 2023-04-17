import { Movie, TicketType } from "../UI/MovieComponents/Movie";

export interface TicketDTO {
  id: number;
  movie: Movie;
  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  quantity: number;
}
