import { Movie, TicketType } from "./Movie";

export interface Ticket {
  id: number;
  movieId: number;
  movie?: Movie;
  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
}
