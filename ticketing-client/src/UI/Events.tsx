import React, { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { getMovies, getStandUpEvents } from '../api/api';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/Movie';
import { StandUp } from '../interfaces/StandUp';
import './CSS/Event.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import BannerCarousel from './BannerCarousel';



function isMovie(event: Movie | StandUp): event is Movie {
  return (event as Movie).imdbRating !== undefined;
}

export default function Events() {
  // Define state hooks for movies and stand-up events
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);

  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [eventType, setEventType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);


  // 2 of each kind
  const eventsPerPage = 4;

  // Fetch movies and stand-up events from API using useEffect hook and update state
  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
  }, []);

  useEffect(() => {
    const allEvents = [...movies, ...standUpEvents];
    let filtered;

    switch (eventType) {
      case 'movies':
        filtered = movies;
        break;
      case 'standUp':
        filtered = standUpEvents;
        break;
      default:
        filtered = allEvents;
    }

    if (searchValue) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [eventType, movies, standUpEvents, searchValue]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
  };

  // Calculate the start and end indices for events on the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getSuggestionValue = (suggestion: { name: any; }) => suggestion.name;

  const renderSuggestion = (suggestion: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
    <div>
      {suggestion.name}
    </div>
  );


  return (
    <div className="">

      {/* The carousel on the top of the page with sliding images */}
      <BannerCarousel />

      {/* search navbar */}
      <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top" bg="dark" variant="dark">
        <Container fluid>
          {/* <Navbar.Brand> </Navbar.Brand> */}

          <NavDropdown
            title={`Select Event Type${eventType ? `: ${eventType}` : ''}`}
            id="nav-dropdown"
            onSelect={(selectedKey: React.SetStateAction<string>) => setEventType(selectedKey)}
          >
            <NavDropdown.Item eventKey="all">All Events</NavDropdown.Item>
            <NavDropdown.Item eventKey="movies">Movies</NavDropdown.Item>
            <NavDropdown.Item eventKey="standUp">Stand-Up</NavDropdown.Item>
          </NavDropdown>

          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              style={{ width: '300px', backgroundColor: '#e9ecef' }}
              value={searchValue}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchValue(e.target.value)}
            />
          </Form>
        </Container>
      </Navbar>


      <Container className="movies-and-standups">
        <Col className="text-center">
          <Row className="justify-content-center">
            <React.Fragment>
              {filteredEvents.slice(startIndex, endIndex).map((event) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={`${isMovie(event) ? 'movie' : 'standup'}-${event.id}`}
                  className="mb-4 d-flex align-items-stretch"
                >
                  <div className="card w-100">
                    <div className="bg-image hover-overlay ripple">
                      <Link
                        to={`/${isMovie(event) ? 'movie' : 'standup'}/${event.id
                          }`}
                      >
                        <img
                          src={event.imageUrl}
                          className="img-fluid"
                          alt={event.name}
                        />
                      </Link>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      {isMovie(event) && (
                        <p className="card-text">
                          IMDb Rating: {event.imdbRating}
                        </p>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </React.Fragment>
          </Row>

          {/* Pagination logic here */}
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-circle justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''
                  }`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <a className="page-link">Previous</a>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''
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
                className={`page-item ${currentPage === totalPages ? 'disabled' : ''
                  }`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>
        </Col>
      </Container >
    </div >
  );
}

