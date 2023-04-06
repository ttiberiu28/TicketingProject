import RestClient from '../REST/RestClient';
import { Movie } from '../interfaces/Movie';
import {StandUp} from '../interfaces/StandUp'


const API_BASE_URL = 'http://localhost:8080';

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

export async function getStandUpEvents(id?: number) {
  const response = await RestClient.getStandUpEvents(); // Use RestClient to get stand-up events
  const standUps = response;
  
  if (id) {
    // Find the movie with the matching ID
    const standUp = standUps.find((s: StandUp) => s.id === id);
    return standUp ? [standUp] : [];
  } else {
    return standUps;
  }

}

