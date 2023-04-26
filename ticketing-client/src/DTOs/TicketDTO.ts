import { Movie } from "../UI/MovieComponents/Movie";
import { Concert } from "../UI/ConcertComponents/Concert";
import { TicketType } from "../UI/TicketType";
import { Seat } from "../interfaces/Seat";

export interface TicketDTO {
  id: number;

  // needs modification for every entity added to cart
  movie: Movie;
  concert: Concert;

  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  ticketSeats: Seat[];
  quantity: number;
  selectedTime: string;
}
