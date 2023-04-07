import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/api';
import { Container, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie';
import './CSS/MovieDetails.css';
import "./CSS/CustomJumbotron.css"


const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTickets, setShowTickets] = useState(false);

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0]));
  }, [index]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleTicketClick = () => {
    setShowTickets(!showTickets);
  };

  return (
    <div className="movie-details-container jumbotron jumbotron-fluid custom-jumbotron">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Card className="movie-poster">
              <Card.Img variant="top" src={movie.imageUrl} />
            </Card>
          </Col>
          <Col className="body lead black-text" xs={12} md={8}>
            <div className="movie-description lead">
              <h1>{movie.name}</h1>
                <ul>
                  <li>IMDb Rating: {movie.imdbRating}</li>
                  <li>Duration: {movie.lengthMinutes} minutes</li>
                  <li>Language: {movie.language}</li>
                  
                  <div className="movie-locations">
                    <h3>Locations:</h3>
                    <ul>
                      {movie.locations.map((location) => (
                        <li key={location.id}>{location.place}</li>
                      ))}
                    </ul>

                  </div>
                </ul>
              <p>{movie.movieDescription}</p>

              <Button variant="primary" onClick={handleTicketClick}>
                Buy tickets
              </Button>

              <Collapse in={showTickets}>

                <div className="ticket-section">
                  <ul>
                    <li>
                      <span><b>2D:</b> {movie.price} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>3D:</b> {movie.price + 8} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>VIP 2D:</b> {movie.price + 40} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>VIP 3D:</b> {movie.price + 48} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}}>Add to Cart</Button>
                    </li>
                  </ul>
                </div>

              </Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
