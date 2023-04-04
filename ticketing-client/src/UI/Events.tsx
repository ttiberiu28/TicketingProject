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
            {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((index) => (
              <Col md={2} key={index} className="mb-4">
                <Card className="event-card">
                  <Link to={`/movie/${index}`}>
                    <Card.Img variant="top" src={myImage} />
                  </Link>
                  <Card.Body>
                    <Card.Title>Movie {index}</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
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

