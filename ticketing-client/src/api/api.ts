import RestClient from '../REST/RestClient';

const API_BASE_URL = 'http://localhost:8080';

export async function getMovies() {
  const response = await RestClient.getMovies(); // Use RestClient to get movies
  return response;
}

export async function getStandUpEvents() {
  const response = await RestClient.getStandUpEvents(); // Use RestClient to get stand-up events
  return response;
}
