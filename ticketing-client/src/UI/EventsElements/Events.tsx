import React, { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { getConcerts, getMovies, getStandUpEvents } from '../../api/api';
import { Link } from 'react-router-dom';
import { Movie } from '../MovieComponents/Movie';
import { StandUp } from '../StandupComponents/StandUp';
import '../CSS/Event.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import BannerCarousel from '../BannerCarousel';
import CartModal2 from '../CartElements/CartModal2';
import { Concert } from '../ConcertComponents/Concert';
import "../CSS/EventDetails.css";




// I need to choose an unique property for each type of event
function isMovie(event: Movie | StandUp | Concert): event is Movie {
  return (event as Movie).imdbRating !== undefined;
}

function isStandUp(event: Movie | StandUp | Concert): event is StandUp {
  return (event as StandUp).eventOrganizer !== undefined;
}

function isConcert(event: Movie | StandUp | Concert): event is Concert {
  return (event as Concert).concertDescription !== undefined;
}

// add other events functions here


// needs modification for every entity added to cart

function getEventRoute(event: Movie | StandUp | Concert): string {
  if (isMovie(event)) {
    return 'movie';
  } else if (isStandUp(event)) {
    return 'standup';
  } else if (isConcert(event)) {
    return 'concert';
  } else {
    throw new Error("Unknown event type");
  }
}


export default function Events() {

  // Define state hooks for movies and stand-up events
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);
  const [concerts, setConcerts] = useState<Concert[]>([]);

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
    getConcerts().then((data) => setConcerts(data));
  }, []);

  useEffect(() => {
    const allEvents = [...movies, ...standUpEvents, ...concerts];
    let filtered;

    switch (eventType) {
      case 'movies':
        filtered = movies;
        break;
      case 'standUps':
        filtered = standUpEvents;
        break;
      case 'concerts':
        filtered = concerts;
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
  }, [eventType, movies, standUpEvents, concerts, searchValue]);

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

  return (
    <div className="background-div">

      {/* The carousel on the top of the page with sliding images */}
      <BannerCarousel />

      {/* search navbar */}
      <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top" bg="dark" variant="dark">
        <Container fluid>

          <NavDropdown
            title={`Select Event Type${eventType ? `: ${eventType}` : ''}`}
            id="nav-dropdown"
            onSelect={(selectedKey: React.SetStateAction<string>) => {
              setEventType(selectedKey);
              setCurrentPage(1);
            }}
          >
            <NavDropdown.Item eventKey="all">All Events</NavDropdown.Item>
            <NavDropdown.Item eventKey="movies">Movies</NavDropdown.Item>
            <NavDropdown.Item eventKey="standUps">Stand-Ups</NavDropdown.Item>
            <NavDropdown.Item eventKey="concerts">Concerts</NavDropdown.Item>
          </NavDropdown>
          <CartModal2 />

          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              style={{ width: '300px', backgroundColor: '#e9ecef' }}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
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
                  key={`${getEventRoute(event)}-${event.id}`}
                  className="mb-4 d-flex align-items-stretch"
                >
                  <div className="card w-100">
                    <div className="bg-image hover-overlay ripple">
                      <Link to={`/${getEventRoute(event)}/${event.id}`}>
                        <img
                          src={event.imageUrl}
                          className="img-fluid"
                          alt={event.name}
                        />
                      </Link>

                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      {/* card description logic below */}
                      {isMovie(event) && (
                        <p className="card-text">
                          IMDb Rating: {event.imdbRating}
                        </p>
                      )}
                      {isStandUp(event) && (
                        <p className="card-text">
                          <i>{event.description}</i>
                        </p>
                      )}
                      {isConcert(event) && (
                        <p className="card-text">
                          <i>{event.artistName}</i>
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

