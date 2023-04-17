import { Movie, TicketType } from "../UI/MovieComponents/Movie";
import { Concert } from "../UI/ConcertComponents/Concert";

export interface TicketDTO {
  id: number;

  // needs modification for every entity added to cart
  movie: Movie;
  concert: Concert;

  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  quantity: number;
}
