import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/api';
import { Container, Row, Col, Card, Button, Collapse, Carousel } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie';
import './CSS/MovieDetails.css';
import "./CSS/CustomJumbotron.css"
import RestClient from "../REST/RestClient";
import BannerCarousel from './BannerCarousel';


const MovieDetails: React.FC = () => {
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTickets, setShowTickets] = useState(false);

  // const embedUrl = "https://www.youtube.com/watch?v=lBeqEBlRicw".replace("watch?v=", "embed/");


  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0]));
  }, [index]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  
  // Convert the YouTube URL to an embed URL
  const embedUrl = movie.trailerUrl.replace("watch?v=", "embed/");

  const handleTicketClick = () => {
    setShowTickets(!showTickets);
  };

  const handleAddToCartClick = async (ticketType: string) => {

    const userIdString = localStorage.getItem("userId"); // Get the user ID from local storage

    if (!userIdString) {
      console.error("User not logged in");
      return;
    }

    const userId = parseInt(userIdString);; // Replace with the actual logged-in user's ID
    const movieId = movie.id;
    const selectedDate = new Date("2023-04-10")
    const selectedRow = 1;
    const selectedSeatNumber = 2;

    try {
      await RestClient.addTicketToCart(userId, movieId, ticketType,selectedDate,selectedRow,selectedSeatNumber);
      console.log("Ticket added to cart");
    } catch (error) {
      console.error("Failed to add ticket to cart", error);
    }
  };

  return (
    <div className="movie-details-container">


      <BannerCarousel />

      <Container>
        
        <Row>
          <Col xs={12} md={4}>
            <Card className="movie-poster">
              <Card.Img variant="top" src={movie.imageUrl} />
            </Card>
          </Col>
          <Col className="body lead black-text" xs={12} md={8}>

          <iframe
              width="560"
              height="315"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
          ></iframe>


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
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}} onClick={() => handleAddToCartClick('STANDARD_2D')}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>3D:</b> {movie.price + 8} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}} onClick={() => handleAddToCartClick('STANDARD_3D')}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>VIP 2D:</b> {movie.price + 40} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}} onClick={() => handleAddToCartClick('VIP_2D')}>Add to Cart</Button>
                    </li>
                    <li>
                      <span><b>VIP 3D:</b> {movie.price + 48} RON</span>
                      <Button variant="success" style={{fontWeight: 'bold', fontSize: '0.20rem'}} onClick={() => handleAddToCartClick('VIP_3D')}>Add to Cart</Button>
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
