import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConcerts } from '../../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Concert } from './Concert';
import '../CSS/EventDetails.css';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { ConcertAccordion } from './ConcertAccordion';
import EventsCarousel from '../EventsComp/EventsCarousel';



const ConcertDetails: React.FC = () => {
    const { index = '0' } = useParams<{ index?: string }>();
    const [concert, setConcert] = useState<Concert | null>(null);

    const eventType = "concert";

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
            <div className="background-div">


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

                        <Col className="body lead black-text overflow-auto event-container-gradient" xs={12} md={8}>

                            <h1 className='myh1 text-center card-bodyy-light2'>{concert.name}</h1>
                            <br></br>

                            <div className="ratio ratio-16x9">
                                <iframe
                                    src={embedUrl}
                                    title="YouTube video"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <ConcertAccordion ticketsGroup={[]} ticketsCount={0} />

                        </Col>
                    </Row>
                </Container>
            </div>

            <EventsCarousel initialEventType={eventType} />
        </div>
    );
};

export default ConcertDetails;
