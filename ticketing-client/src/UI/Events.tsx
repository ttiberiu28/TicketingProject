import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import './CSS/Events.css';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/Movie';
import {StandUp} from '../interfaces/StandUp'

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
    <div className="jumbotron jumbotron-fluid custom-jumbotron">
      <Container className="movies-and-standups">
        <Row className="justify-content-center align-items-center vh-100">
          <Col className="text-center">
            <h1 className="lead "><i>EVENTS</i></h1>
            <Row className="justify-content-center">
              {/* Map through movies array and render a Card component for each movie */}
              {movies.map((movie) => (
                <Col md={2} key={movie.id} className="mb-4">
                    <Card className="event-card card-body-fixed-height">

                      <Link to={`/movie/${movie.id}`}>
                        <Card.Img variant="top" src={movie.imageUrl} />
                      </Link>

                      <Card.Body>
                        <Card.Title className="card-title-black-text" >{movie.name}</Card.Title>
                        <Card.Text className= "imdb-text-color">
                          IMDb Rating: {movie.imdbRating}
                        </Card.Text>
                      </Card.Body>
                  </Card>
                </Col>
              ))}

              {/* Map through standUpEvents array and render a Card component for each event */}
              {standUpEvents.map((standUp) => (
                <Col md={2} key={standUp.id} className="mb-4">
                  <Card className="event-card card-body-fixed-height">

                  <Link to={`/standup/${standUp.id}`}>
                    <Card.Img variant="top" src={standUp.imageUrl} />
                  </Link>

                    <Card.Body>
                      <Card.Title>{standUp.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
