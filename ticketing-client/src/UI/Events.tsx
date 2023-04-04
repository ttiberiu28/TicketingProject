import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import './Events.css';

interface Movie {
  id: number;
  name: string;
  imdbRating: number;
  // Add more properties as needed
}

interface StandUp {
  id: number;
  name: string;
  // Add more properties as needed
}

const MoviesAndStandups: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standups, setStandups] = useState<StandUp[]>([]);

  useEffect(() => {
    (async () => {
      const movies = await getMovies();
      setMovies(movies);
      console.log('Movies:', movies);

      const standups = await getStandUpEvents();
      setStandups(standups);
      console.log('Standup events:', standups);
    })();
  }, []);

  return (
    <Container className="movies-and-standups">
      <Row>
        <Col>
          <h2 className="section-title">Movies</h2>
          {movies.map((movie) => (
            <Card key={movie.id} className="event-card mb-3">
              <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  IMDb Rating: {movie.imdbRating}
                </Card.Subtitle>
                <Badge pill variant="info" className="mx-1">
                  Genre
                </Badge>
                <Badge pill variant="info" className="mx-1">
                  Language
                </Badge>
                <Button variant="primary" className="mt-3">
                  Buy Tickets
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <h2 className="section-title">Standup Events</h2>
          {standups.map((standup) => (
            <Card key={standup.id} className="event-card mb-3">
              <Card.Body>
                <Card.Title>{standup.name}</Card.Title>
                <Badge pill variant="info" className="mx-1">
                  Performer
                </Badge>
                <Badge pill variant="info" className="mx-1">
                  Location
                </Badge>
                <Button variant="primary" className="mt-3">
                  Buy Tickets
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesAndStandups;
