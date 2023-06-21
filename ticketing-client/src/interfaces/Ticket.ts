import { Movie } from "../UI/MovieComp/Movie";
import { Concert } from "../UI/ConcertComp/Concert";
import { TicketType } from "../UI/CartComp/TicketType";
import { Seat } from "./Seat";
import { Sport } from "../UI/SportComp/Sport";


export interface Ticket {
  id: number;

  movieId?: number;
  concertId?: number;
  sportId?: number;

  movie?: Movie;
  concert?: Concert;
  sport?: Sport;

  date: Date;
  row: number;
  seatNumber: number;
  ticketType: TicketType;
  ticketSeats: Seat[];
  quantity: number;
  selectedTime: string;
}
