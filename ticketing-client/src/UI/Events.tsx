import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import './Events.css';
import myImage from './Images/im4.jpg';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/Movie';

// Define interface for StandUp events
interface StandUp {
  id: number;
  name: string;
}

// Define functional component that will display movies and stand-up events
export default function Events() {
  // Define state hooks for movies and stand-up events
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);

  // Fetch movies and stand-up events from API using useEffect hook and update state
  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
  }, []);

  // Render movies and stand-up events using React Bootstrap
  return (
    <Container className="movies-and-standups">
      <Row className="justify-content-center align-items-center vh-100">
        <Col className="text-center">
          <h2 className="section-title mb-5">Movies</h2>
          <Row className="justify-content-center">
            {/* Map through movies array and render a Card component for each movie */}
            {movies.map((movie) => (
              <Col md={2} key={movie.id} className="mb-4">
                <Card className="event-card">
                  <Link to={`/movie/${movie.id}`}>
                    {/* <Card.Img variant="top" src={myImage} />      */}
                     <Card.Img variant="top" src={movie.imageUrl} />

                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>
                      IMDb Rating: {movie.imdbRating}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
