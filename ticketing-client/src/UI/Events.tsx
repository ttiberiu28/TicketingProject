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
  // Add more properties as needed
}

interface StandUp {
  id: number;
  name: string;
  // Add more properties as needed
}

export default function Events(){

  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);

  useEffect(() => {
    getMovies().then(data => setMovies(data));
    getStandUpEvents().then(data => setStandUpEvents(data));
  }, []);

  return (
    
    <Container className="movies-and-standups">
      <Row>
        <Col>
          <h2 className="section-title">Movies</h2>
          <Row>
            {movies.map(movie => (
              <Col md={2} key={movie.id}>
                <Card className="event-card">
                <Card.Img variant="top" src={myImage} />
                <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>Some description for the movie</Card.Text>
                </Card.Body>
                </Card>
                
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <Row>
            {standUpEvents.map(event => (
              <Col md={2} key={event.id}>
                <Card className="event-card">
                <Card.Img variant="top" src={myImage} />
                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <Row>
            {[1, 2, 3, 4, 5].map(index => (
              <Col md={2} key={index}>
                <Card className="event-card">
                    
                <Link to={`/movie/${index}`}>
                    <Card.Img variant="top" src={myImage} />
                </Link>
                  <Card.Body>
                    <Card.Title>Movie {index}</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

