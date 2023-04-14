import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/api';
import { Container, Row, Col, Card, Button, Collapse, Carousel } from 'react-bootstrap';
import { Movie, TicketType } from '../interfaces/Movie';
import './CSS/MovieDetails.css';
import "./CSS/CustomJumbotron.css"
import RestClient from "../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


// added the logic for the ticket here

export default function MovieAccordion() {

  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTickets, setShowTickets] = useState(false);


  useEffect(() => {
    getMovies(parseInt(index)).then((data) => {
      const fetchedMovie = data[0];
      setMovie({
        ...fetchedMovie,
        getPrice: (ticketType: TicketType) => {
          switch (ticketType) {
            case TicketType.STANDARD_2D:
              return fetchedMovie.price;
            case TicketType.STANDARD_3D:
              return fetchedMovie.price + 8;
            case TicketType.VIP_2D:
              return fetchedMovie.price + 40;
            case TicketType.VIP_3D:
              return fetchedMovie.price + 48;
            default:
              return fetchedMovie.price;
          }
        },
      });
    });
  }, [index]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleTicketClick = () => {
    setShowTickets(!showTickets);
  };

  const handleAddToCartClick = async (ticketType: TicketType) => {
    const userIdString = localStorage.getItem("userId");
  
    if (!userIdString) {
      console.error("User not logged in");
      return;
    }
  
    const userId = parseInt(userIdString);
    const movieId = movie.id;
    const selectedDate = new Date("2023-04-10");
    const selectedRow = 1;
    const selectedSeatNumber = 2;
  
    try {
      const ticket = await RestClient.addTicketToCart(userId, movieId, ticketType, selectedDate, selectedRow, selectedSeatNumber);
      console.log("Ticket added to cart");
  
      // Update the cart state with the new ticket
      setCart((prevCart) => {
        if (!prevCart) {
          return { id: 0, tickets: [ticket] };
        }
  
        return { ...prevCart, tickets: [...prevCart.tickets, ticket] };
      });
    } catch (error) {
      console.error("Failed to add ticket to cart", error);
    }
  };
  
  

    return(
        <div className="accordion accordion-borderless" id="accordionFlushExampleX">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOneX">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOneX" aria-expanded="true" aria-controls="flush-collapseOneX">
                        <code>Buy tickets</code>
                      </button>
                    </h2>


                    <div id="flush-collapseOneX" className="accordion-collapse collapse show"
                      aria-labelledby="flush-headingOneX" >
                      <div className="accordion-body">
                         
                        <Button variant="primary" onClick={handleTicketClick}>
                          {/* {localStorage.getItem("userId")} */}
                          Buy tickets 
                        </Button>

                        <Collapse in={showTickets}>

                          <div className="ticket-section">
                                  <ul>
                                    <li>
                                      <span><b>2D:</b> {movie.getPrice(TicketType.STANDARD_2D)} RON</span>
                                      <button type="button" className="btn btn-secondary btn-dark btn-rounded" onClick={() => handleAddToCartClick(TicketType.STANDARD_2D)}>Add to cart</button>
                                    </li>
                                    <li>
                                      <span><b>3D:</b> {movie.getPrice(TicketType.STANDARD_3D)} RON</span>
                                      <button type="button" className="btn btn-secondary btn-dark btn-rounded" onClick={() => handleAddToCartClick(TicketType.STANDARD_3D)}>Add to cart</button>
                                    </li>
                                    <li>
                                      <span><b>VIP 2D:</b> {movie.getPrice(TicketType.VIP_2D)} RON</span>
                                      <button type="button" className="btn btn-secondary btn-dark btn-rounded" onClick={() => handleAddToCartClick(TicketType.VIP_2D)}>Add to Cart</button>
                                    </li>
                                    <li>
                                      <span><b>VIP 3D:</b> {movie.getPrice(TicketType.VIP_3D)} RON</span>
                                      <button type="button" className="btn btn-secondary btn-dark btn-rounded" onClick={() => handleAddToCartClick(TicketType.VIP_3D)}>Add to cart</button>
                                    </li>
                                  </ul>
                          </div>

                        </Collapse>

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwoX">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwoX" aria-expanded="false" aria-controls="flush-collapseTwoX">
                        Locations
                      </button>
                    </h2>
                    <div id="flush-collapseTwoX" className="accordion-collapse collapse" aria-labelledby="flush-headingTwoX"
                      data-bs-parent="#accordionFlushExampleX">
                      <div className="accordion-body">

                          <h3>Locations:</h3>
                          <code>

                              {movie.locations
                              .map((location) => location.place)
                              .join(', ')}

                          </code>

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThreeX">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThreeX" aria-expanded="false" aria-controls="flush-collapseThreeX">
                        IMDb Rating:&nbsp;&nbsp;&nbsp;<code className=''> {movie.imdbRating}</code>
                      </button>
                    </h2>
                    <div id="flush-collapseThreeX" className="accordion-collapse collapse" aria-labelledby="flush-headingThreeX"
                      data-bs-parent="#accordionFlushExampleX">
                      <div className="accordion-body">
                        {movie.movieDescription}
                      </div>
                    </div>
                  </div>
            </div>
    )
}

function setCart(arg0: (prevCart: any) => any) {
  throw new Error('Function not implemented.');
}
