import { Movie, TicketType } from "../UI/MovieComponents/Movie";

export interface TicketDTO {
  id: number;
  movie: Movie;
  date: Date; // It's better to use string here since it comes from the server
  row: number;
  seatNumber: number;
  ticketType: TicketType; // Assuming ticketType is a string
  quantity: number;
}
