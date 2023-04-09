import { MyLocation } from "./MyLocation";

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
  }