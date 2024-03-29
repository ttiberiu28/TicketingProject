import React, { useEffect, useState, useRef } from 'react';
import {
    Navbar, NavDropdown, Form, FormControl,
    Card, Carousel, Button, Container, Row, Col
} from 'react-bootstrap';
import { getConcerts, getMovies, getStandUpEvents, getSports } from '../../api/api';
import { Movie } from '../MovieComp/Movie';
import { StandUp } from '../StandupComponents/StandUp';
import '../CSS/EventCarousel.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Concert } from '../ConcertComp/Concert';
import styles from "../CSS/CardComponent.module.css";
import { Link } from 'react-router-dom';
import CartModal from '../CartComp/CartModal';
import { Sport } from '../SportComp/Sport';

interface EventsCarouselProps {
    initialEventType: string;
}
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


interface CardComponentProps {
    src: string;
    title: string;
    text: string;
    event: Movie | StandUp | Concert | Sport;
}

const CardComponent: React.FC<CardComponentProps> = ({ event }) => {
    const route = getEventRoute(event);

    return (
        <Col xs={12} sm={6} md={4} lg={2} className="mb-2 my-card-custom-height">

            <Card className={styles.card}>
                <Link to={`/${route}/${event.id}`}>

                    <Card.Img variant="top my-event-image hover-overlay ripple rounded" src={event.imageUrl} alt={event.name} />

                </Link>

                <Card.Body>
                    <Card.Title className="card-titlee-bold" >{event.name}</Card.Title>
                    <Card.Text className="card-bodyy-light truncate-text">
                        {isMovie(event) && `IMDb Rating: ${event.imdbRating}`}
                        {isStandUp(event) && event.description}
                        {isConcert(event) && event.artistName}
                        {isSport(event) && event.sportDescription}
                    </Card.Text>
                </Card.Body>


            </Card>

        </Col >
    );
};


export default function EventsCarousel({ initialEventType }: EventsCarouselProps) {


    // Define state hooks for movies and stand-up events
    const [movies, setMovies] = useState<Movie[]>([]);
    const [standUpEvents, setStandUpEvents] = useState<StandUp[]>([]);
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);

    const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
    const [eventType, setEventType] = useState(initialEventType);
    const [searchValue, setSearchValue] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const carouselRef = useRef(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);



    // 2 of each kind
    const eventsPerPage = 3;

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

    const chunkSize = 6;
    const slideCount = Math.ceil(filteredEvents.length / chunkSize)
    const chunkedEvents = Array(slideCount)
        .fill(0)
        .map((_, i) => filteredEvents.slice(i * chunkSize, (i * chunkSize) + chunkSize))
        .filter((chunk, i) => chunk.length === chunkSize || i === slideCount - 1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className=''>

            {/* search navbar */}
            <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top gradient-custom-search-bar" bg="dark" variant="dark">
                <Container fluid>

                    <NavDropdown className="bolded"
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
                        <NavDropdown.Item eventKey="sports">Sports</NavDropdown.Item>
                    </NavDropdown>
                    <CartModal />
                </Container>
            </Navbar>

            <Carousel className="card-gradient" interval={3000} activeIndex={activeSlideIndex} onSelect={(selectedIndex: React.SetStateAction<number>) => setActiveSlideIndex(selectedIndex)}>
                {chunkedEvents.map((chunk, chunkIndex) => (
                    <Carousel.Item key={`carousel-item-${chunkIndex}`}>
                        <div className="card-gradient">
                            <Row>
                                {chunk.map((event) => (
                                    <CardComponent
                                        key={`event-${event.id}`}
                                        event={event}
                                        src={''}
                                        title={''}
                                        text={''}
                                    />
                                ))}
                            </Row>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

        </div >
    );
}

