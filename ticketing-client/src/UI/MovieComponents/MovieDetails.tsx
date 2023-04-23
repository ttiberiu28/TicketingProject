import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Movie } from './Movie';
import '../CSS/EventDetails.css';
import BannerCarousel from '../BannerCarousel';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MovieAccordion } from './MovieAccordion';
import EventsCarousel from '../EventsElements/EventsCarousel';
import "../CSS/CardComponent.module.css"
import { Link } from 'react-router-dom';



const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const eventType = "movie";

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

        <Container className="content-container">

          <Row >

            <Col xs={12} md={4}>
              <Card className="movie-poster">
                <Card.Img
                  variant="top" src={movie.imageUrl}
                  style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                />
              </Card>
            </Col>

            <Col className="body lead black-text overflow-auto event-container-gradient" xs={12} md={6}>

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

            <Col className="overflow-auto d-flex flex-column" xs={12} md={2}>

              <div className="multi-carousel vertical" style={{
                maxWidth: "20rem", objectFit: "cover",
                width: "100%"
              }}>
                <div className="multi-carousel-inner my-wider-image">

                  <div className="multi-carousel-item hover-overlay hover-zoom ripple rounded ">
                    <img
                      src="https://www.cinemacity.ro/static/dam/jcr:7a062e8e-aeb1-465d-b804-858f411cd37c"
                      alt="Sample Image 1"
                      className="w-100 "
                    />
                  </div>

                  <div className="multi-carousel-item hover-overlay hover-zoom ripple rounded">
                    <Link to="/offers">
                      <img
                        src="https://i.ytimg.com/vi/tp6GCf5pA3A/maxresdefault.jpg"
                        alt="Sample Image 4"
                        className="w-100 "
                      />
                    </Link>
                  </div>
                  <div className="multi-carousel-item hover-overlay hover-zoom ripple rounded">
                    <Link to="/offers">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nO_bCRqMS8VRLw5kjNW6a8u4SDfX0LkoYQ&usqp=CAU"
                        alt="Sample Image 4"
                        className="w-100 "
                      />
                    </Link>
                  </div>



                  <div className="multi-carousel-item bg-image hover-overlay hover-zoom ripple rounded">
                    <Link to="/offers">
                      <Card className="movie-poster">
                        <Card.Img
                          src="https://www.cinemacity.ro/static/dam/jcr:9f3e1db9-7e81-446a-b19e-11c2b095d0ba/1906_CC_VIP_Light_meniuri_2022_LIGHT.jpg"
                          variant="top"
                          style={{ borderRadius: "2rem 10 1 2rem", objectFit: "cover", height: "100%" }}
                        />
                      </Card>
                    </Link>
                  </div>


                </div>

              </div>
            </Col>
          </Row>
        </Container>

      </div>
      <EventsCarousel initialEventType={eventType} />


    </div >
  );
};

export default MovieDetails;
