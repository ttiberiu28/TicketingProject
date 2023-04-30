import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSports } from '../../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Sport } from './Sport';
import '../CSS/EventDetails.css';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { SportAccordion } from './SportAccordion';
import EventsCarousel from '../EventsComp/EventsCarousel';



const SportDetails: React.FC = () => {
    const { index = '0' } = useParams<{ index?: string }>();
    const [sport, setSport] = useState<Sport | null>(null);

    const eventType = "sport";

    useEffect(() => {
        getSports(parseInt(index)).then((data) => setSport(data[0]));
    }, [index]);

    if (!sport) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="background-div">


                <BannerCarousel />

                <Container className="content-container">

                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="movie-poster">
                                <Card.Img
                                    variant="top" src={sport.imageUrl}
                                    style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                                />
                            </Card>
                        </Col>

                        <Col className="body lead black-text overflow-auto event-container-gradient" xs={12} md={8}>

                            <h1 className='myh1 text-center card-bodyy-light2'>{sport.name}</h1>
                            <br></br>

                            <div className="ratio ratio-16x9">
                                <Card.Img
                                    variant="top" src={sport.bannerUrl}
                                    style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                                />
                            </div>

                            <SportAccordion ticketsGroup={[]} ticketsCount={0} />

                        </Col>
                    </Row>
                </Container>
            </div>

            <EventsCarousel initialEventType={eventType} />
        </div>
    );
};

export default SportDetails;
