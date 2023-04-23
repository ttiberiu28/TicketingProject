import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getConcerts } from '../../api/api';
import { Button, Collapse } from 'react-bootstrap';
import { TicketType } from "../TicketType";
import { Concert } from './Concert';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import CartModal2 from '../CartElements/CartModal2';
import { MyLocation } from '../../interfaces/MyLocation';


interface ConcertAccordionProps {
    ticketsGroup: any[];
    ticketsCount: number;
}

export const ConcertAccordion: React.FC<ConcertAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

    const { index = '0' } = useParams<{ index?: string }>();
    const [concert, setConcert] = useState<Concert | null>(null);
    const [showTickets, setShowTickets] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<MyLocation | null>(null);



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

        // TODO: get these values from the UI using a select seat component
        const selectedRow = 3;
        const selectedSeatNumber = 4;

        try {
            // needs modification for every entity added to cart(adding null)
            const ticket = await RestClient.addTicketToCart(userId, null, concertId,
                ticketType, selectedDate, selectedRow, selectedSeatNumber);

            console.log("Ticket added to cart");

            // Update the cart state with the new ticket
            setCart((prevCart) => {
                if (!prevCart) {
                    return { id: 0, tickets: [ticket] };
                }

                // Find existing ticket index with the same movieId and ticketType
                const existingTicketIndex = prevCart.tickets.findIndex((t: { concertId: number; ticketType: TicketType; }) => t.concertId === concertId && t.ticketType === ticketType);

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
                                            onClick={() => handleAddToCartClick(TicketType.ONE_DAY_PASS)}><i>{concert.getPrice(TicketType.ONE_DAY_PASS)} RON</i><b> One day pass</b>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                                            onClick={() => handleAddToCartClick(TicketType.TWO_DAY_PASS)}><i>{concert.getPrice(TicketType.TWO_DAY_PASS)} RON</i><b> Two day pass <i>5% discount</i></b>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="btn btn-secondary btn-dark btn-rounded fas fa-shopping-cart text-white"
                                            onClick={() => handleAddToCartClick(TicketType.THREE_DAY_PASS)}><i>{concert.getPrice(TicketType.THREE_DAY_PASS)} RON</i><b> Three day pass <i>10% discount</i></b>
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
