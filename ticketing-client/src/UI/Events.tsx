import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel} from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/Movie';
import { StandUp } from '../interfaces/StandUp';
import "./CSS/Event.css"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


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
      <Carousel
              className="carousel-container"
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon custom-arrow custom-prev"
                />
              }
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon custom-arrow custom-next"
                />
              }>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://lumiere-a.akamaihd.net/v1/images/avatar-twow-videobg01_cdd3dcb8.jpeg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://images.unsplash.com/photo-1537724841875-c0901308941f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://images.unsplash.com/photo-1574894078563-01e879b89809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>

      <Container className="movies-and-standups">
        <Row className="justify-content-center align-items-center vh-100">
          <p></p>
          <Col className="text-center">
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
