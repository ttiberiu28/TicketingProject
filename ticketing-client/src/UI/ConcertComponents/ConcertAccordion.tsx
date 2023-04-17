import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getConcerts } from '../../api/api';
// import { Button, Collapse } from 'react-bootstrap';
// import { Concert, TicketTypeConcert } from './Concert';
// import '../CSS/EventDetails.css';
// import RestClient from "../../REST/RestClient";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import CartModal2 from '../CartElements/CartModal2';

// interface ConcertAccordionProps {
//     ticketsGroup: any[];
//     ticketsCount: number;
// }

// export const ConcertAccordion: React.FC<ConcertAccordionProps> = ({ ticketsGroup, ticketsCount }) => {

//     const { index = '0' } = useParams<{ index?: string }>();
//     const [concert, setConcert] = useState<Concert | null>(null);
//     const [showTickets, setShowTickets] = useState(false);

//     useEffect(() => {
//         getConcerts(parseInt(index)).then((data) => {
//             const fetchedConcert = data[0];
//             setConcert({
//                 ...fetchedConcert,
//                 getPrice: (ticketType: TicketTypeConcert) => {
//                     switch (ticketType) {
//                         case TicketTypeConcert.TWO_DAY_PASS:
//                             return fetchedConcert.getPrice(TicketTypeConcert.TWO_DAY_PASS);
//                         case TicketTypeConcert.THREE_DAY_PASS:
//                             return fetchedConcert.getPrice(TicketTypeConcert.THREE_DAY_PASS);
//                         default:
//                             return fetchedConcert.getPrice(TicketTypeConcert.ONE_DAY_PASS);
//                     }
//                 },
//             });
//         });
//     }, [index]);

//     if (!concert) {
//         return <div>Loading...</div>;
//     }

//     const handleTicketClick = () => {
//         setShowTickets(!showTickets);
//     };

//     const handleAddToCartClick = async (ticketType: TicketTypeConcert) => {
//         const userIdString = localStorage.getItem("userId");

//         if (!userIdString) {
//             console.error("User not logged in");
//             return;
//         }

//         const userId = parseInt(userIdString);
//         const concertId = concert.id;
//         const price = concert.getPrice(ticketType);
//         const quantity = 1;

//         await RestClient.addTicketToCart(userId, concertId, ticketType, price, quantity);
//     }
// }

export default function ConcertAccordion() {

    return (

        <div className="jumbotron jumbotron-fluid custom-jumbotron">
            <div className="container">
                <h1 className="display-4">Ticket-to-GO</h1>


                <p className="lead"> The fastest way to buy your ticket right </p>
                <p className="lead upside-down">now</p>



            </div>
        </div>

    )
}