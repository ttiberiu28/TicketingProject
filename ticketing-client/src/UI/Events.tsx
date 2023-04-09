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
  const [currentPage, setCurrentPage] = useState(1);

  // 2 of each kind
  const eventsPerPage = 4;

  // Fetch movies and stand-up events from API using useEffect hook and update state
  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
  }, []);

  const handlePageChange = (newPage: number) => {

    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
  };

  // Calculate the start and end indices for events on the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;

   // Filter the events based on the current page
   const displayedMovies = movies.slice(startIndex, endIndex);
   const displayedStandUpEvents = standUpEvents.slice(startIndex, endIndex);

   // Calculate the total number of pages
   const totalPages = Math.ceil((movies.length + standUpEvents.length - 1) / eventsPerPage);



  return (
    <div className="">

      {/* The carousel on the top of the page with sliding images */}
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
              
              {displayedMovies.map((movie) => (
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
              
  
              {displayedStandUpEvents.map((standUp) => (
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

            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-circle justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <a className="page-link">Previous</a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    <a className="page-link" href="#">
                      {i + 1}
                      {currentPage === i + 1 && (
                        <span className="visually-hidden">(current)</span>
                      )}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </nav>
            
          </Col>
        </Row>
      </Container>
      
    </div>
    
  );
  
};
