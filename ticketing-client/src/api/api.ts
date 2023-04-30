import RestClient from '../REST/RestClient';
import { Movie } from '../UI/MovieComp/Movie';
import { StandUp } from '../UI/StandupComponents/StandUp'
import { Concert } from '../UI/ConcertComp/Concert'
import { Sport } from '../UI/SportComp/Sport';



export async function getMovies(id?: number) {
  const response = await RestClient.getMovies(); // Use RestClient to get movies
  const movies = response;

  if (id) {
    const movie = movies.find((m: Movie) => m.id === id);
    return movie ? [movie] : [];
  } else {
    return movies;
  }
}

export async function getConcerts(id?: number) {
  const response = await RestClient.getConcerts();
  const concerts = response;

  if (id) {

    const concert = concerts.find((c: Concert) => c.id === id);
    return concert ? [concert] : [];
  } else {
    return concerts;
  }

}


export async function getSports(id?: number) {
  const response = await RestClient.getSports();
  const sports = response;

  if (id) {

    const sport = sports.find((s: Sport) => s.id === id);
    return sport ? [sport] : [];
  } else {
    return sports;
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


