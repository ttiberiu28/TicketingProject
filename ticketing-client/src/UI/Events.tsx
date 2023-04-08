import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/Movie';
import { StandUp } from '../interfaces/StandUp';
import "./CSS/Event.css"

export default function Events() {
  // Define state hooks for movies and stand-up events
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);

  // Fetch movies and stand-up events from API using useEffect hook and update state
  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
  }, []);


  return (
    <div className="">
      <Container className="movies-and-standups">
        <Row className="justify-content-center align-items-center vh-100">
          <Col className="text-center">
            <h1 className="lead "><i>EVENTS</i></h1>
            <Row className="justify-content-center">
              {movies.map((movie) => (
                <Col xs={12} sm={6} md={4} lg={3} key={movie.id} className="mb-4">
                  <div className="card">
                    <div className="bg-image hover-overlay ripple">
                      <Link to={`/movie/${movie.id}`}>
                        <img src={movie.imageUrl} className="img-fluid" alt={movie.name} />
                      </Link>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{movie.name}</h5>
                      <p className="card-text">IMDb Rating: {movie.imdbRating}</p>
                    </div>
                  </div>
                </Col>
              ))}
              
  
              {standUpEvents.map((standUp) => (
                <Col xs={12} sm={6} md={4} lg={3} key={standUp.id} className="mb-4">
                  <div className="card">
                    <div className="bg-image hover-overlay ripple">
                      <Link to={`/standup/${standUp.id}`}>
                        <img src={standUp.imageUrl} className="img-fluid" alt={standUp.name} />
                      </Link>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{standUp.name}</h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
};
