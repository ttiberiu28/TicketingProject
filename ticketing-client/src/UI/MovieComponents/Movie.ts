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

    let price;

    switch (ticketType) {
      case TicketType.VIP_2D:
        price = this.price + 40;
        break;
      case TicketType.VIP_3D:
        price = this.price + 48;
        break;
      case TicketType.STANDARD_3D:
        price = this.price + 8;
        break;

      default:
        price = this.price;
    }

    return Math.round(price);
  }
}
