import { MyLocation } from "./MyLocation";

export enum TicketType {
  STANDARD_2D = 'STANDARD_2D',
  STANDARD_3D = 'STANDARD_3D',
  VIP_2D = 'VIP_2D',
  VIP_3D = 'VIP_3D',
}

export interface Movie {
    id: number;
    price: number;
    name: string;
    imdbRating: number;
    lengthMinutes: number;
    language: string;
    tickets: string[];
    movieDescription: string;
    imageUrl: string;
    trailerUrl: string;
    locations: MyLocation[];

    getPrice: (ticketType: TicketType) => number;
  }