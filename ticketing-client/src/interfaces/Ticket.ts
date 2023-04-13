import { Movie } from "./Movie";

export interface Ticket {
    id: number;
    movieId: number;
    movie?: Movie;
  }