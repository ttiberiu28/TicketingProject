import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getConcerts } from '../../api/api';
import { Button, Collapse } from 'react-bootstrap';
import { TicketType } from "../TicketType";
import { Concert } from './Concert';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MyLocation } from '../../interfaces/MyLocation';
import CartModal from '../CartElements/CartModal';
import { useCartContext } from "../CartElements/CartContext";


interface ConcertAccordionProps {
    ticketsGroup: any[];
    ticketsCount: number;
}


interface ConcertAvailableHours {
    movieId: number;
    availableHours: string;
}

export const ConcertAccordion: React.FC<ConcertAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

    const { index = '0' } = useParams<{ index?: string }>();
    const [concert, setConcert] = useState<Concert | null>(null);
    const [showTickets, setShowTickets] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<MyLocation | null>(null);

    const { fetchCart } = useCartContext();

    const ticketTypes = [
        { type: TicketType.ONE_DAY_PASS, label: 'One Day Pass' },
        { type: TicketType.TWO_DAY_PASS, label: 'Two Day Pass' },
        { type: TicketType.THREE_DAY_PASS, label: 'Three Day Pass' },
        { type: TicketType.STUDENT_ONE_DAY_PASS, label: 'Student One Day Pass' },
        { type: TicketType.STUDENT_TWO_DAY_PASS, label: 'Student Two Day Pass' },
        { type: TicketType.STUDENT_THREE_DAY_PASS, label: 'Student Three Day Pass' },
    ];

    const findClosestAvailableTime = (
        concertId: number,
        selectedDate: string | number | Date,
        availableHours: string
    ) => {
        const selectedDateTime = new Date(selectedDate);
        let closestHour = null;
        let minDiff = Number.MAX_SAFE_INTEGER;

        // Parse the availableHours string into an array of strings
        const parsedAvailableHours = JSON.parse(availableHours);

        parsedAvailableHours.forEach((hour: string) => {
            const [hours, minutes] = hour.split(':');
            const concertDateTime = new Date(selectedDateTime);
            concertDateTime.setHours(parseInt(hours));
            concertDateTime.setMinutes(parseInt(minutes));

            const diff = Math.abs(concertDateTime.getTime() - selectedDateTime.getTime());
            if (diff < minDiff) {
                closestHour = hour;
                minDiff = diff;
            }
        });

        return closestHour;
    };



    useEffect(() => {
        getConcerts(parseInt(index)).then((data) => {
            const fetchedConcert = data[0];
            const concertInstance = new Concert(fetchedConcert);

            setConcert(concertInstance);
        });
    }, [index]);

    if (!concert) {
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
        const concertId = concert.id;

        const selectedDate = new Date("2023-04-10");

        const selectedRow = 2;
        const selectedSeatNumber = 2;

        const closestAvailableTime: string | null = findClosestAvailableTime(
            concertId,
            selectedDate,
            concert.availableHours
        );

        if (closestAvailableTime) {
            // Use closestAvailableTime here
        } else {
            console.error("No available hours found for the concert");
            return;
        }



        try {
            const ticket = await RestClient.addTicketToCart(
                userId,
                null,
                concertId,
                ticketType,
                selectedDate,
                [{ row: selectedRow, seat: selectedSeatNumber }],
                closestAvailableTime
            );

            console.log("Ticket added to cart");

            // Call fetchCart to refresh the cart data
            fetchCart();

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

                        <Button variant="btn btn-success" onClick={handleTicketClick} style={{ width: '300px' }}>
                            Buy tickets
                        </Button>


                        <CartModal />


                        <Collapse in={showTickets}>

                            <div className="ticket-section">
                                <ul>
                                    {ticketTypes.map((ticketType) => (
                                        <li key={ticketType.type}>
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                                                onClick={() => handleAddToCartClick(ticketType.type)}
                                            >
                                                <i>{concert.getPrice(ticketType.type)} RON</i>
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
                        Location
                    </button>
                </h2>
                <div id="flush-collapseTwoX" className="accordion-collapse collapse" aria-labelledby="flush-headingTwoX"
                    data-bs-parent="#accordionFlushExampleX">
                    <div className="accordion-body">
                        <h3>Locations:</h3>
                        {concert.locations.map((location) => (
                            <Link
                                key={location.id}
                                to={`/location/${location.id}`} // Update the path based on your routing configuration
                                className="location-link"
                            >
                                {location.place + ','}
                            </Link>
                        )
                        )}

                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThreeX">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThreeX" aria-expanded="false" aria-controls="flush-collapseThreeX">
                        Lineup:&nbsp;&nbsp;&nbsp;<code className=''> {concert.artistName}</code>
                    </button>
                </h2>
                <div id="flush-collapseThreeX" className="accordion-collapse collapse" aria-labelledby="flush-headingThreeX"
                    data-bs-parent="#accordionFlushExampleX">
                    <div className="accordion-body">
                        {concert.concertDescription}
                    </div>
                </div>
            </div>
        </div>
    )
}

function setCart(arg0: (prevCart: any) => any) {
    throw new Error('Function not implemented.');
}
