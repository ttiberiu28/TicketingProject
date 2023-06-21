import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../api/api';
import { Button, Collapse, Modal } from 'react-bootstrap';
import { Movie } from './Movie';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { TicketType } from "../CartComp/TicketType";
import "../CSS/SeatPicker.css";
import { CustomSeatPicker } from "../EventsComp/SeatPicker";
import { MyLocation } from "../../interfaces/MyLocation";
import { Link } from 'react-router-dom';
import CartModal from '../CartComp/CartModal';
import { useCartContext } from "../CartComp/CartContext";
import MyDateTimePicker from '../EventsComp/MyDateTimePicker';
import { MyKeyword } from '../../interfaces/MyKeyword';



interface MovieAccordionProps {
  ticketsGroup: any[];
  ticketsCount: number;
}

interface MovieAvailableHour {
  movieId: number;
  availableHours: string;
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
  const [locationError, setlocationError] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [movieAvailableHours, setMovieAvailableHours] = useState<MovieAvailableHour[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const ticketTypes = [
    { type: TicketType.STANDARD_2D, label: '2D' },
    { type: TicketType.STANDARD_3D, label: '3D' },
    { type: TicketType.VIP_2D, label: 'VIP 2D' },
    { type: TicketType.VIP_3D, label: 'VIP 3D' },
    { type: TicketType.STUDENT_2D, label: 'Student 2D' },
    { type: TicketType.STUDENT_3D, label: 'Student 3D' },
  ];

  const [occupiedSeats, setOccupiedSeats] = useState<{ row: number; seat: number }[]>([]);

  useEffect(() => {
    RestClient.getTicketSeat().then(seats => setOccupiedSeats(seats));
  }, []);



  const findClosestAvailableTime = (
    movieId: number,
    selectedDate: string | number | Date,
    movieAvailableHours: MovieAvailableHour[]
  ) => {
    const movieData = movieAvailableHours.find((movie) => movie.movieId === movieId);
    if (!movieData) {
      return null;
    }

    const selectedDateTime = new Date(selectedDate);
    let closestHour = null;
    let minDiff = Number.MAX_SAFE_INTEGER;

    // Parse the availableHours string into an array of strings
    const parsedAvailableHours = JSON.parse(movieData.availableHours);

    parsedAvailableHours.forEach((hour: string) => {
      const [hours, minutes] = hour.split(':');
      const movieDateTime = new Date(selectedDateTime);
      movieDateTime.setHours(parseInt(hours));
      movieDateTime.setMinutes(parseInt(minutes));

      const diff = Math.abs(movieDateTime.getTime() - selectedDateTime.getTime());
      if (diff < minDiff) {
        closestHour = hour;
        minDiff = diff;
      }
    });

    return closestHour;
  };

  const handleHourBadgeClick = (hour: string) => {
    const [hours, minutes] = hour.split(':');
    const updatedSelectedDateTime = new Date(selectedDateTime);
    updatedSelectedDateTime.setHours(parseInt(hours));
    updatedSelectedDateTime.setMinutes(parseInt(minutes));
    setSelectedDateTime(updatedSelectedDateTime);
    setSelectedHour(hour);
  };



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
      setMovieAvailableHours([
        ...movieAvailableHours,
        { movieId: fetchedMovie.id, availableHours: fetchedMovie.availableHours },
      ]);

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
      setlocationError("Choose a location first");
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

    if (!selectedDateTime) {
      setDateError("Please select a date");
      return;
    } else {
      setDateError(null);
    }

    const userId = parseInt(userIdString);
    const movieId = movie.id;

    const selectedDate = new Date(selectedDateTime);

    const closestAvailableTime: string | null = findClosestAvailableTime(
      movie.id,
      selectedDate,
      movieAvailableHours
    );



    if (closestAvailableTime) {
      const [hours, minutes] = (closestAvailableTime as string).split(':');
      selectedDate.setHours(parseInt(hours));
      selectedDate.setMinutes(parseInt(minutes));
    } else {
      console.error("No available hours found for the movie");
      return;
    }


    try {
      const ticket = await RestClient.addTicketToCart(
        userId,
        movieId,
        null,
        null,
        ticketType,
        selectedDate,
        selectedSeats,
        closestAvailableTime,
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
            <code>Buy tickets </code>
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
                  <select id="location-select" className="select my-select" value={selectedLocation ? selectedLocation.id : ""}
                    onChange={(e) => {
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
                  {locationError && (
                    <div className="alert alert-danger" role="alert">
                      {locationError}
                    </div>
                  )}
                </div>

                <Modal size="xl" show={showModal} onHide={handleModalVisibility}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select a seat</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <div className="date-time-picker">
                      <label>Select Date:</label>
                      <MyDateTimePicker
                        selected={selectedDateTime}
                        onChange={(date: Date) => setSelectedDateTime(date)}
                      />
                      {dateError && (
                        <div className="alert alert-danger mt-2" role="alert">
                          {dateError}
                        </div>
                      )}
                    </div>

                    <div className="available-hours">
                      <div className="d-flex align-items-center">
                        <label className="me-2">Available Hours:</label>
                        {JSON.parse(movie.availableHours).map((hour: string, index: number) => (
                          <span
                            key={index}
                            className={`badge rounded-pill me-2 ${hour === selectedHour ? "badge-success" : "badge-info"
                              } hour-badge`}
                            onClick={() => handleHourBadgeClick(hour)}
                            style={{ cursor: "pointer", fontSize: "1.1rem" }}
                          >
                            {hour}
                          </span>
                        ))}
                      </div>
                    </div>

                    <CustomSeatPicker
                      seatsLayout={
                        selectedLocation
                          ? (() => {
                            console.log("selectedLocation.seatsLayout", selectedLocation.seatsLayout);
                            return JSON.parse(selectedLocation.seatsLayout);
                          })()
                          : [[]]
                      }
                      onSeatSelected={handleSeatSelected}
                      selectedSeats={selectedSeats}
                      occupiedSeats={occupiedSeats}  // pass the occupiedSeats to the CustomSeatPicker
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
                  {ticketTypes.map((ticketType) => (
                    <li key={ticketType.type}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                        onClick={() => handleOpenModalWithTicketType(ticketType.type)}
                      >
                        <i>{movie.getPrice(ticketType.type)} RON</i>
                        <b> {ticketType.label}</b>
                      </button>
                    </li>
                  ))}
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

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {movie.keywords.map((keyword, index) => {
            const badgeClasses = [
              "badge",
              "rounded-pill",
              "me-2",
              "mb-2",
              index % 4 === 0
                ? "badge-success"
                : index % 4 === 1
                  ? "badge-info"
                  : index % 4 === 2
                    ? "badge-warning"
                    : "badge-danger"
            ];

            return (
              <span key={keyword.id} className={badgeClasses.join(" ")}>
                {keyword.name}
              </span>
            );
          })}
        </div>

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
