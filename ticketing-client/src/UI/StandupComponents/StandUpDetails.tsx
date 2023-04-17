import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStandUpEvents } from '../../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { StandUp } from './StandUp';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MovieAccordion } from '../MovieComponents/MovieAccordion';
import '../CSS/EventDetails.css';

const StandUpDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>(); // get the ID of the stand-up event from the URL
  const [standUp, setStandUp] = useState<StandUp | null>(null); // create a state variable to hold the stand-up event data

  useEffect(() => {
    getStandUpEvents(parseInt(index)).then((data) => setStandUp(data[0]));
  }, [index]);

  if (!standUp) {
    return <div>Loading...</div>; // show a loading message until the stand-up event data is fetched
  }

  return (
    <div className="">

      <BannerCarousel />

      <Container className="content-container">

        <Row>
          <Col xs={12} md={4}>
            <Card className="movie-poster">
              <Card.Img
                variant="top" src={standUp.imageUrl}
                style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%", width: "100%" }}
              />
            </Card>
          </Col>

          <Col className="body lead black-text overflow-auto" xs={12} md={8}>

            <h1>{standUp.name}</h1>
            <br></br>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StandUpDetails;
