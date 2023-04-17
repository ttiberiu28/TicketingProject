import { Movie } from "../UI/MovieComponents/Movie";
import { Concert } from "../UI/ConcertComponents/Concert";
import { TicketType } from "../UI/TicketType";


export interface Ticket {
  id: number;

  //these are used for CartModal
  // needs modification for every entity added to cart
  movieId?: number;
  concertId?: number;

  // needs modification for every entity added to cart
  movie?: Movie;
  concert?: Concert;

  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  quantity: number;
}
