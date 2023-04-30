import React, { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { getConcerts, getMovies, getSports, getStandUpEvents } from '../../api/api';
import { Link } from 'react-router-dom';
import { Movie } from '../MovieComp/Movie';
import { StandUp } from '../StandupComponents/StandUp';
import '../CSS/Event.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import BannerCarousel from '../BannerCarousel';
import { Concert } from '../ConcertComp/Concert';
import "../CSS/EventDetails.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartModal from '../CartComp/CartModal';
import { Sport } from '../SportComp/Sport';



// I need to choose an unique property for each type of event
function isMovie(event: Movie | StandUp | Concert | Sport): event is Movie {
  return (event as Movie).imdbRating !== undefined;
}

function isStandUp(event: Movie | StandUp | Concert | Sport): event is StandUp {
  return (event as StandUp).eventOrganizer !== undefined;
}

function isConcert(event: Movie | StandUp | Concert | Sport): event is Concert {
  return (event as Concert).concertDescription !== undefined;
}

function isSport(event: Movie | StandUp | Concert | Sport): event is Sport {
  return (event as Sport).sportDescription !== undefined;
}



// needs modification for every entity added to cart

function getEventRoute(event: Movie | StandUp | Concert | Sport): string {
  if (isMovie(event)) {
    return 'movie';
  } else if (isStandUp(event)) {
    return 'standup';
  } else if (isConcert(event)) {
    return 'concert';
  }
  else if (isSport(event)) {
    return 'sport';
  }
  else {
    throw new Error("Unknown event type");
  }
}


export default function Events() {


  // these are used to get the filter from the url and navigate to the url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterFromUrl = queryParams.get('filter');
  const navigate = useNavigate();


  // Define state hooks for movies and stand-up events
  const [movies, setMovies] = useState<Movie[]>([]);
  const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);

  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  // const [eventType, setEventType] = useState('');
  const [eventType, setEventType] = useState(filterFromUrl || '');
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);




  // 2 of each kind
  const eventsPerPage = 4;

  // Fetch movies and stand-up events from API using useEffect hook and update state
  useEffect(() => {
    getMovies().then((data) => setMovies(data));
    getStandUpEvents().then((data) => setStandUpEvents(data));
    getConcerts().then((data) => setConcerts(data));
    getSports().then((data) => setSports(data));
  }, []);

  useEffect(() => {
    const allEvents = [...movies, ...standUpEvents, ...concerts, ...sports];
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
      case 'sports':
        filtered = sports;
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
  }, [eventType, movies, standUpEvents, concerts, sports, searchValue]);

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

      <BannerCarousel />

      <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top gradient-custom-search-bar" bg="dark" variant="dark">
        <Container fluid>

          <NavDropdown className="bolded"
            title={`Select Event Type${eventType ? `: ${eventType}` : ''}`}
            id="nav-dropdown"
            onSelect={(selectedKey: React.SetStateAction<string>) => {
              setEventType(selectedKey);
              setCurrentPage(1);
              if (selectedKey === 'all') {
                navigate('/events');
              } else {
                navigate(`/events?filter=${selectedKey}`);
              }
            }}

          >
            <NavDropdown.Item eventKey="all">All Events</NavDropdown.Item>
            <NavDropdown.Item eventKey="movies">Movies</NavDropdown.Item>
            <NavDropdown.Item eventKey="standUps">Stand-Ups</NavDropdown.Item>
            <NavDropdown.Item eventKey="concerts">Concerts</NavDropdown.Item>
            <NavDropdown.Item eventKey="sports">Sports</NavDropdown.Item>
          </NavDropdown>
          <CartModal />

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


      <Container className="">
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
                  <div className="card w-100 card-gradient">
                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="green">

                      <Link to={`/${getEventRoute(event)}/${event.id}`}>
                        <img
                          src={event.imageUrl}
                          className="img-fluid my-event-image"
                          alt={event.name}
                        />
                        <div className="mask" style={{ backgroundColor: 'rgb(126, 243, 188,0.2)' }}></div>

                      </Link>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title card-titlee-bold">{event.name}</h5>

                      {/* card description logic below */}
                      {isMovie(event) && (
                        <p className="card-text card-bodyy-light">
                          IMDb Rating: {event.imdbRating}
                        </p>
                      )}
                      {isStandUp(event) && (
                        <p className="card-text card-bodyy-light text-truncate">
                          <i>{event.description}</i>
                        </p>
                      )}
                      {isConcert(event) && (
                        <p className="card-text card-bodyy-light text-truncate">
                          <i>{event.artistName}</i>
                        </p>
                      )}
                      {isSport(event) && (
                        <p className="card-text card-bodyy-light text-truncate">
                          <i>{event.sportDescription}</i>
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
                <a className="page-link">Prev</a>
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

