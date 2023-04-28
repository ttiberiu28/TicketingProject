import { MyKeyword } from "../../interfaces/MyKeyword";
import { MyLocation } from "../../interfaces/MyLocation";
import { TicketType } from "../TicketType";

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
  availableHours: string;
  locations: MyLocation[];
  keywords: MyKeyword[];

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
    this.availableHours = data.availableHours;
    this.locations = data.locations;
    this.keywords = data.keywords;
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
      case TicketType.STUDENT_2D:
        price = this.price - 6;
        break;
      case TicketType.STUDENT_3D:
        price = this.price + 3;
        break;

      default:
        price = this.price;
    }

    return Math.round(price);
  }
}
