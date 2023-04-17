import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../api/api';
import { Button, Collapse } from 'react-bootstrap';
import { Movie, TicketType } from './Movie';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import CartModal2 from '../CartElements/CartModal2';


interface MovieAccordionProps {
  ticketsGroup: any[];
  ticketsCount: number;
}

export const MovieAccordion: React.FC<MovieAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showTickets, setShowTickets] = useState(false);


  useEffect(() => {
    getMovies(parseInt(index)).then((data) => {
      const fetchedMovie = data[0];
      setMovie({
        ...fetchedMovie,
        getPrice: (ticketType: TicketType) => {
          switch (ticketType) {
            case TicketType.STANDARD_2D:
              return fetchedMovie.getPrice(TicketType.STANDARD_2D);
            case TicketType.STANDARD_3D:
              return fetchedMovie.getPrice(TicketType.STANDARD_3D);
            case TicketType.VIP_2D:
              return fetchedMovie.getPrice(TicketType.VIP_2D);
            case TicketType.VIP_3D:
              return fetchedMovie.getPrice(TicketType.VIP_3D);
            default:
              return fetchedMovie.getPrice(TicketType.STANDARD_2D);
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

        // Find existing ticket index with the same movieId and ticketType
        const existingTicketIndex = prevCart.tickets.findIndex((t: { movieId: number; ticketType: TicketType; }) => t.movieId === movieId && t.ticketType === ticketType);

        if (existingTicketIndex !== -1) {
          // Update the existing ticket's quantity
          const updatedTickets = [...prevCart.tickets];
          updatedTickets[existingTicketIndex] = ticket;
          return { ...prevCart, tickets: updatedTickets };
        } else {
          // Add the new ticket to the cart
          return { ...prevCart, tickets: [...prevCart.tickets, ticket] };
        }
      });
    } catch (error) {
      console.error("Failed to add ticket to cart", error);
    }

    // reload the page to update the cart
    window.location.reload();
  };



  return (
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

            <Button variant="btn btn-success" onClick={handleTicketClick} style={{ width: '300px' }}>
              Buy tickets
            </Button>


            <CartModal2 />


            <Collapse in={showTickets}>

              <div className="ticket-section">
                <ul>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleAddToCartClick(TicketType.STANDARD_2D)}><i>{movie.getPrice(TicketType.STANDARD_2D)} RON</i><b> 2D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleAddToCartClick(TicketType.STANDARD_3D)}><i>{movie.getPrice(TicketType.STANDARD_3D)} RON</i><b> 3D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleAddToCartClick(TicketType.VIP_2D)}><i>{movie.getPrice(TicketType.VIP_2D)} RON</i><b> VIP 2D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleAddToCartClick(TicketType.VIP_3D)}><i>{movie.getPrice(TicketType.VIP_3D)} RON</i><b> VIP 3D</b>
                    </button>
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
