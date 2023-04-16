import { Movie, TicketType } from "../UI/MovieComponents/Movie";

export interface Ticket {
  id: number;
  movieId: number;
  movie?: Movie;
  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  quantity: number;
}
