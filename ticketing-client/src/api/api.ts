import RestClient from '../REST/RestClient';
import { Movie } from '../interfaces/Movie';


const API_BASE_URL = 'http://localhost:8080';

// export async function getMovies() {
//   const response = await RestClient.getMovies(); // Use RestClient to get movies
//   return response;
// }

export async function getMovies(id?: number) {
  const response = await RestClient.getMovies(); // Use RestClient to get movies
  const movies = response;

  if (id) {
    // Find the movie with the matching ID
    const movie = movies.find((m: Movie) => m.id === id);
    return movie ? [movie] : [];
  } else {
    return movies;
  }
}

export async function getStandUpEvents() {
  const response = await RestClient.getStandUpEvents(); // Use RestClient to get stand-up events
  return response;
}

