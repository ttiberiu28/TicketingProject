import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../api/api';
import { Container, Row, Col, Card, Button, Collapse, Carousel } from 'react-bootstrap';
import { Movie } from './Movie';
import '../CSS/EventDetails.css';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MovieAccordion } from './MovieAccordion';
import EventsCarousel from '../EventsElements/EventsCarousel';
import "../CSS/CardComponent.module.css"


const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0]));
  }, [index]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Convert the YouTube URL to an embed URL
  const embedUrl = movie.trailerUrl.replace("watch?v=", "embed/");

  return (
    <div className=" ">

      <div className="background-div">

        <BannerCarousel />

        <Container className="content-container ">

          <Row>
            {/* <Col xs={12} md={2}>
              <div className="multi-carousel vertical" style={{ maxWidth: "20rem" }}>
                <div className="multi-carousel-inner">
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  tabIndex={0}
                  data-mdb-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  tabIndex={0}
                  data-mdb-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>

              </div>
            </Col> 
            !!ADD md={6} to the last Col*/}
            <Col xs={12} md={4}>
              <Card className="movie-poster">
                <Card.Img
                  variant="top" src={movie.imageUrl}
                  style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                />
              </Card>
            </Col>

            <Col className="body lead black-text overflow-auto event-container-gradient" xs={12} md={8}>

              <h1 className='myh1 text-center card-bodyy-light2'>{movie.name}</h1>
              <br></br>

              <div className="ratio ratio-16x9">
                <iframe
                  src={embedUrl}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>

              <MovieAccordion ticketsGroup={[]} ticketsCount={0} />

            </Col>
          </Row>
        </Container>

      </div>
      <EventsCarousel />

    </div >
  );
};

export default MovieDetails;
