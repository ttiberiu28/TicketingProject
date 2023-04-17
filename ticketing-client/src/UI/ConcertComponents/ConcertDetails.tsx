import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConcerts, getMovies } from '../../api/api';
import { Container, Row, Col, Card, Button, Collapse, Carousel } from 'react-bootstrap';
import { Concert } from './Concert';
import '../CSS/EventDetails.css';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import { MovieAccordion } from './MovieAccordion';


const ConcertDetails: React.FC = () => {
    const { index = '0' } = useParams<{ index?: string }>();
    const [concert, setConcert] = useState<Concert | null>(null);

    useEffect(() => {
        getConcerts(parseInt(index)).then((data) => setConcert(data[0]));
    }, [index]);

    if (!concert) {
        return <div>Loading...</div>;
    }

    // Convert the YouTube URL to an embed URL
    const embedUrl = concert.trailerUrl.replace("watch?v=", "embed/");

    return (
        <div className="">

            <BannerCarousel />

            <Container className="content-container">

                <Row>
                    <Col xs={12} md={4}>
                        <Card className="movie-poster">
                            <Card.Img
                                variant="top" src={concert.imageUrl}
                                style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                            />
                        </Card>
                    </Col>

                    <Col className="body lead black-text overflow-auto" xs={12} md={8}>

                        <h1>{concert.name}</h1>
                        <br></br>

                        <div className="ratio ratio-16x9">
                            <iframe
                                src={embedUrl}
                                title="YouTube video"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* <MovieAccordion ticketsGroup={[]} ticketsCount={0} /> */}

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ConcertDetails;