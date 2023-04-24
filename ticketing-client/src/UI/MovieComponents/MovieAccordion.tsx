import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../api/api';
import { Button, Collapse, Modal } from 'react-bootstrap';
import { Movie } from './Movie';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { TicketType } from "../TicketType";
import "../CSS/SeatPicker.css";
import { CustomSeatPicker } from "../SeatPicker";
import { MyLocation } from "../../interfaces/MyLocation";
import { Link } from 'react-router-dom';
import CartModal from '../CartElements/CartModal';
import { useCartContext } from "../CartElements/CartContext";



interface MovieAccordionProps {
  ticketsGroup: any[];
  ticketsCount: number;
}

export const MovieAccordion: React.FC<MovieAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showTickets, setShowTickets] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<{ row: number; seat: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<MyLocation | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Array<{ row: number; seat: number }>>([]);
  const { cart, setCart, fetchCart } = useCartContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


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

  const handleModalVisibility = () => {
    setShowModal(!showModal);
  };

  const handleChipClose = (index: number) => {
    setSelectedSeats(selectedSeats.filter((_, i) => i !== index));
  };


  const handleLocationSelected = (location: MyLocation) => {
    setSelectedLocation(location);
  };


  const handleOpenModalWithTicketType = (ticketType: TicketType) => {
    if (!selectedLocation) {
      setErrorMessage("Choose a location first");
      return;
    }
    setSelectedTicketType(ticketType);
    handleModalVisibility();
  };

  const handleSeatClick = (row: number, seat: number) => {
    const seatIndex = selectedSeats.findIndex((s) => s.row === row && s.seat === seat);
    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, { row, seat }]);
    } else {
      setSelectedSeats(selectedSeats.filter((_, i) => i !== seatIndex));
    }
  };


  const handleSeatSelected = (row: number, seat: number) => {
    const seatIndex = selectedSeats.findIndex((s) => s.row === row && s.seat === seat);
    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, { row, seat }]);
    } else {
      setSelectedSeats(selectedSeats.filter((_, i) => i !== seatIndex));
    }
  };





  const getRowsAndSeatsPerRow = (capacity: number) => {
    const seatsPerRow = 10; // You can adjust this value based on your requirements
    const rows = Math.ceil(capacity / seatsPerRow);
    return { rows, seatsPerRow };
  };



  const handleAddToCartClick = async (ticketType: TicketType) => {
    const userIdString = localStorage.getItem("userId");

    if (!userIdString) {
      console.error("User not logged in");
      return;
    }
    if (selectedSeats.length === 0) {
      console.error("No seat selected");
      alert("No seats selected");
      return;
    }

    const userId = parseInt(userIdString);
    const movieId = movie.id;
    const selectedDate = new Date("2023-04-10");

    try {
      const ticket = await RestClient.addTicketToCart(
        userId,
        movieId,
        null,
        ticketType,
        selectedDate,
        selectedSeats // Pass the selectedSeats array here
      );

      console.log("Ticket added to cart");

      if (fetchCart) {
        fetchCart();
      }

    } catch (error) {
      console.error("Failed to add ticket to cart", error);
    }
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

            <Button variant="btn btn-success" onClick={handleTicketClick} style={{ width: '400px' }}>
              Buy tickets
            </Button>

            <CartModal />


            <Collapse in={showTickets}>

              <div className="ticket-section">
                <div>
                  <label htmlFor="location-select">Choose a location:</label>
                  <select id="location-select" className="select my-select" value={selectedLocation ? selectedLocation.id : ""} onChange={(e) => {
                    const selectedId = parseInt(e.target.value);
                    const location = movie.locations.find(loc => loc.id === selectedId);
                    if (location) {
                      handleLocationSelected(location);
                    }
                  }}>
                    {!selectedLocation && <option value="">Select a location</option>}
                    {movie.locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.place}
                      </option>
                    ))}
                  </select>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>

                <Modal show={showModal} onHide={handleModalVisibility}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select a seat</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CustomSeatPicker
                      rows={selectedLocation ? getRowsAndSeatsPerRow(selectedLocation.capacity).rows : 0}
                      seatsPerRow={selectedLocation ? getRowsAndSeatsPerRow(selectedLocation.capacity).seatsPerRow : 0}
                      onSeatSelected={handleSeatSelected}
                      selectedSeats={selectedSeats}
                    />

                    {selectedTicketType && (
                      <button
                        className="btn btn-dark fas fa-shopping-cart text-white"
                        onClick={() => handleAddToCartClick(selectedTicketType)}
                        style={{ width: "100%" }}
                      >
                        Add to cart
                      </button>
                    )}

                    {selectedSeats.map((seat, index) => (
                      <div key={index} className="chip chip-outline btn-outline-dark" data-mdb-ripple-color="dark">
                        Row: {seat.row}, Seat: {seat.seat}
                        <i className="close fas fa-times" onClick={() => handleChipClose(index)}></i>
                      </div>
                    ))}

                  </Modal.Body>
                </Modal>
                <ul>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleOpenModalWithTicketType(TicketType.STANDARD_2D)}><i>{movie.getPrice(TicketType.STANDARD_2D)} RON</i><b> 2D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleOpenModalWithTicketType(TicketType.STANDARD_3D)}><i>{movie.getPrice(TicketType.STANDARD_3D)} RON</i><b> 3D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleOpenModalWithTicketType(TicketType.VIP_2D)}><i>{movie.getPrice(TicketType.VIP_2D)} RON</i><b> VIP 2D</b>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                      onClick={() => handleOpenModalWithTicketType(TicketType.VIP_3D)}><i>{movie.getPrice(TicketType.VIP_3D)} RON</i><b> VIP 3D</b>
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
            {movie.locations.map((location) => (
              <Link
                key={location.id}
                to={`/location/${location.id}`} // Update the path based on your routing configuration
                className="location-link"
              >
                {location.place + ','}
              </Link>
            ))}
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
