import React from 'react';
import BannerCarousel from '../BannerCarousel';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../CSS/EventDetails.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "../CSS/CardComponent.module.css"
import OffersCarousel from './MovieOffersCarousel';
import EventsCarousel from '../EventsComp/EventsCarousel';
import '.././CSS/MovieOffers.css';


const MovieOffers = () => {

    const eventType = "movie";

    return (
        <div className="my-container-padding ">
            <div className="background-div ">
                <BannerCarousel />

                <Container className="">

                    <Row>
                        <Col className="overflow-auto d-flex flex-column h-100" xs={12} md={4}>

                            <Card className="">
                                <Card.Img
                                    variant="top"
                                    src="https://www.cinemacity.ro/static/dam/jcr:9f3e1db9-7e81-446a-b19e-11c2b095d0ba/1906_CC_VIP_Light_meniuri_2022_LIGHT.jpg"
                                    style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                                />
                            </Card>

                        </Col>

                        <Col xs={12} sm={6} md={7} className="d-flex flex-column gradient-custom-offer-container" style={{ padding: "0" }}>

                            <img
                                src="https://i.ytimg.com/vi/tp6GCf5pA3A/maxresdefault.jpg"
                                style={{ height: "35%" }}
                            />

                            <Row className="d-flex flex-column" style={{ flex: 1 }}>
                                <h3 className='offer-writing-bold'
                                    style={{ padding: "1rem" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Saepe mollitia adipisci nemo provident voluptatem totam aperiam perspiciatis a eaque,
                                    deleniti, possimus iste consequatur harum vel praesentium?
                                    Dignissimos adipisci quaerat cum!</h3>
                                <div style={{ flexGrow: 1 }}>
                                    <OffersCarousel />
                                </div>
                            </Row>

                        </Col>

                    </Row>

                </Container>
            </div>
            <EventsCarousel initialEventType={eventType} />

        </div>
    );
};

export default MovieOffers;
