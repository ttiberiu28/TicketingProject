import { MyLocation } from "../../interfaces/MyLocation";

export enum TicketType {
  STANDARD_2D = 'STANDARD_2D',
  STANDARD_3D = 'STANDARD_3D',
  VIP_2D = 'VIP_2D',
  VIP_3D = 'VIP_3D',
}

export class Movie {
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

  constructor(data: any) {
    this.id = data.id;
    this.price = data.price;
    this.name = data.name;
    this.imdbRating = data.imdbRating;
    this.lengthMinutes = data.lengthMinutes;
    this.language = data.language;
    this.tickets = data.tickets;
    this.movieDescription = data.movieDescription;
    this.imageUrl = data.imageUrl;
    this.trailerUrl = data.trailerUrl;
    this.locations = data.locations;
  }

  getPrice(ticketType: TicketType): number {

    switch (ticketType) {
      case TicketType.VIP_2D:
        return this.price * 1.5;
      case TicketType.VIP_3D:
        return this.price * 2;
      case TicketType.STANDARD_3D:
        return this.price * 1.2;
      default:
        return this.price;
    }
  }
}
