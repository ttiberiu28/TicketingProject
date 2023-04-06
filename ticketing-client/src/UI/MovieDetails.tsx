import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/api';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie'; // import the Movie interface
import './CSS/MovieDetails.css'; // import custom CSS file

const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>(); // get the ID of the movie from the URL
  const [movie, setMovie] = useState<Movie | null>(null); // create a state variable to hold the movie data
  const [activeIndex, setActiveIndex] = useState(0); // create a state variable to track the active slide index

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0])); // fetch the movie data when the component mounts and set the state variable
  }, [index]); // re-fetch the movie data whenever the ID in the URL changes

  if (!movie) {
    return <div>Loading...</div>; // show a loading message until the movie data is fetched
  }

  // show the movie details once the data is fetched
  return (
    <div className="movie-details-container">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Card className="movie-poster">
              <Card.Img variant="top" src={movie.imageUrl} />
            </Card>
          </Col>
          <Col xs={12} md={8}>
            <div className="movie-description">
              <h1>{movie.name}</h1>
              <ul>
                <li>IMDb Rating: {movie.imdbRating}</li>
                <li>Duration: {movie.lengthMinutes} minutes</li>
                <li>Language: {movie.language}</li>
              </ul>
              <p>{movie.movieDescription}</p>
              <Button variant="primary">Buy tickets</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
