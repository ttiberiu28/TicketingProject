import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import './Events.css';
import myImage from './Images/im4.jpg';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  name: string;
  imdbRating: number;
  lengthMinutes: number
}

interface StandUp {
  id: number;
  name: string;
}

export default function Events() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);

  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
  }, []);

  return (
    <Container className="movies-and-standups">
      <Row className="justify-content-center align-items-center vh-100">
        <Col className="text-center">
          <h2 className="section-title mb-5">Movies</h2>
          <Row className="justify-content-center">
            {movies.map((movie) => (
              <Col md={2} key={movie.id} className="mb-4">
                <Card className="event-card">
                  <Link to={`/movie/${movie.id}`}>
                    <Card.Img variant="top" src={myImage} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>
                      IMDb Rating: {movie.imdbRating} <br />
                      Duration: {movie.lengthMinutes}
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


