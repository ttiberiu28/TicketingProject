import { Movie } from "../UI/MovieComp/Movie";
import { Concert } from "../UI/ConcertComp/Concert";
import { TicketType } from "../UI/CartComp/TicketType";
import { Seat } from "../interfaces/Seat";
import { Sport } from "../UI/SportComp/Sport";

export interface TicketDTO {
  id: number;

  // needs modification for every entity added to cart
  movie: Movie;
  concert: Concert;
  sport: Sport;

  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  ticketSeats: Seat[];
  quantity: number;
  selectedTime: string;
}
