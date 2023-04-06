import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie'; // import the Movie interface

const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>(); // get the ID of the movie from the URL
  const [movie, setMovie] = useState<Movie | null>(null); // create a state variable to hold the movie data

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0])); // fetch the movie data when the component mounts and set the state variable
  }, [index]); // re-fetch the movie data whenever the ID in the URL changes

  if (!movie) {
    return <div>Loading...</div>; // show a loading message until the movie data is fetched
  }

  // show the movie details once the data is fetched
  return (
    <div>
      <h1>{movie.name}</h1>
      <p>{movie.movieDescription}</p>
      <ul>
        <li>IMDb Rating: {movie.imdbRating}</li>
        <li>Duration: {movie.lengthMinutes} minutes</li>
      </ul>
    </div>
  );
};

export default MovieDetails;
