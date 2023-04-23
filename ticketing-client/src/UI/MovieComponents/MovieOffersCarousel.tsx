import React, { useEffect, useState } from 'react';
import {
    Col, Card, Carousel, Row
} from 'react-bootstrap';
import '../CSS/EventCarousel.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import styles from "../CSS/CardComponent.module.css";
import RestClient from '../../REST/RestClient';
import { MyLocation } from '../../interfaces/MyLocation';
import { Link } from 'react-router-dom';

interface CardComponentProps {
    location: MyLocation;
}

const CardComponent: React.FC<CardComponentProps> = ({ location }) => {
    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
            <Card className={styles.card}>
                <Link to={`/locations/${location.id}`}>
                    <Card.Img variant="top" src={location.imageUrl} alt={location.place} className="my-event-image hover-overlay ripple rounded" />
                </Link>
                <Card.Body>
                    <Card.Title className="card-titlee-bold">{location.place}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default function OffersCarousel() {
    const [locations, setLocations] = useState<MyLocation[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<MyLocation[]>([]);

    useEffect(() => {
        RestClient.getLocations().then((data: React.SetStateAction<MyLocation[]>) => setLocations(data));
    }, []);

    useEffect(() => {
        const cinemaCityLocations = locations.filter((location) =>
            location.place.toLowerCase().includes("cinema city")
        );
        setFilteredLocations(cinemaCityLocations);
    }, [locations]);

    const chunkSize = 4;
    const slideCount = Math.ceil(filteredLocations.length / chunkSize);
    const chunkedLocations = Array(slideCount)
        .fill(0)
        .map((_, i) => filteredLocations.slice(i * chunkSize, (i + 1) * chunkSize));

    return (
        <div className=''>
            <Carousel className="card-gradient" interval={3000}>
                {chunkedLocations.map((chunk, chunkIndex) => (
                    <Carousel.Item key={`carousel-item-${chunkIndex}`}>
                        <div className="card-gradient">
                            <Row>
                                {chunk.map((location) => (
                                    <CardComponent
                                        key={`location-${location.id}`}
                                        location={location}
                                    />
                                ))}
                            </Row>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
