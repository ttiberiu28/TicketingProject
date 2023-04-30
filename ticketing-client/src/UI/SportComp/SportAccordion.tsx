import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSports } from '../../api/api';
import { Button, Collapse } from 'react-bootstrap';
import { TicketType } from "../CartComp/TicketType";
import { Sport } from './Sport';
import '../CSS/EventDetails.css';
import RestClient from "../../REST/RestClient";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MyLocation } from '../../interfaces/MyLocation';
import CartModal from '../CartComp/CartModal';
import { useCartContext } from "../CartComp/CartContext";


interface SportAccordionProps {
    ticketsGroup: any[];
    ticketsCount: number;
}


interface SportAvailableHours {
    movieId: number;
    availableHours: string;
}

export const SportAccordion: React.FC<SportAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

    const { index = '0' } = useParams<{ index?: string }>();
    const [sport, setSport] = useState<Sport | null>(null);
    const [showTickets, setShowTickets] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<MyLocation | null>(null);

    const { fetchCart } = useCartContext();

    const ticketTypes = [
        { type: TicketType.PELUZA_NORD, label: 'Peluza Nord' },
        { type: TicketType.PELUZA_SUD, label: 'Peluza Sud' },
        { type: TicketType.TRIBUNA_EST_ZONE_1, label: 'Tribuna Est I' },
        { type: TicketType.TRIBUNA_EST_ZONE_2, label: 'Tribuna Est II' },
        { type: TicketType.TRIBUNA_VEST_ZONE_1, label: 'Tribuna Vest I' },
        { type: TicketType.TRIBUNA_VEST_ZONE_2, label: 'Tribuna Vest II' },

    ];

    const findClosestAvailableTime = (
        sportId: number,
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
            const sportDateTime = new Date(selectedDateTime);
            sportDateTime.setHours(parseInt(hours));
            sportDateTime.setMinutes(parseInt(minutes));

            const diff = Math.abs(sportDateTime.getTime() - selectedDateTime.getTime());
            if (diff < minDiff) {
                closestHour = hour;
                minDiff = diff;
            }
        });

        return closestHour;
    };



    useEffect(() => {
        getSports(parseInt(index)).then((data) => {
            const fetchedSport = data[0];
            const sportInstance = new Sport(fetchedSport);

            setSport(sportInstance);
        });
    }, [index]);

    if (!sport) {
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
        const sportId = sport.id;

        const selectedDate = new Date("2023-04-10");

        const selectedRow = 2;
        const selectedSeatNumber = 2;

        const closestAvailableTime: string | null = findClosestAvailableTime(
            sportId,
            selectedDate,
            sport.availableHours
        );

        if (closestAvailableTime) {
            // Use closestAvailableTime here
        } else {
            console.error("No available hours found for the sport");
            return;
        }



        try {
            const ticket = await RestClient.addTicketToCart(
                userId,
                null,
                null,
                sportId,
                ticketType,
                selectedDate,
                [{ row: selectedRow, seat: selectedSeatNumber }],
                closestAvailableTime
            );

            console.log("Ticket added to cart");

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
                                                className="btn btn-secondary btn-dark   btn-rounded fas fa-shopping-cart text-white"
                                                onClick={() => handleAddToCartClick(ticketType.type)}
                                            >
                                                <i>{sport.getPrice(ticketType.type)} RON</i>
                                                <b>{ticketType.label}</b>
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
                        {sport.locations.map((location) => (
                            <Link
                                key={location.id}
                                to={`/location/${location.id}`}
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
                        Lineup:&nbsp;&nbsp;&nbsp;<code className=''> {sport.sportDescription}</code>
                    </button>
                </h2>
                <div id="flush-collapseThreeX" className="accordion-collapse collapse" aria-labelledby="flush-headingThreeX"
                    data-bs-parent="#accordionFlushExampleX">
                    <div className="accordion-body">
                        We are inviting you to enjoy {sport.lengthMinutes} amazing minutes of intenese sport.
                        <br />
                        <code>Seats will be announced at the location!</code>
                    </div>
                </div>
            </div>
        </div>
    )
}

function setCart(arg0: (prevCart: any) => any) {
    throw new Error('Function not implemented.');
}
