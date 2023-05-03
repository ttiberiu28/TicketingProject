import '../CSS/SuccessPage.css';
import { Table, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import RestClient from '../../REST/RestClient';
import { getMovies, getConcerts, getSports } from '../../api/api';
import { groupBy, flatMap } from "lodash";
import { useCartContext } from './CartContext';
import { Cart } from '../../interfaces/Cart';



export default function SuccessPage() {

    const [updatedCart, setUpdatedCart] = useState<Cart | null>(null);
    const [updatedTicketsGroups, setUpdatedTicketsGroups] = useState<any[] | null>(null);

    const { cart } = useCartContext();

    const userIdString = localStorage.getItem("userId");
    const userId = userIdString ? parseInt(userIdString) : null;

    const fetchCart = async (callback?: () => void) => {
        if (!userId) return;

        const fetchedCart = await RestClient.getCart(userId);

        if (fetchedCart) {

            const ticketPromises = fetchedCart.tickets.map(async (ticket) => {
                if (ticket.movieId) {
                    const movie = await getMovies(ticket.movieId);
                    return { ...ticket, movie: movie[0] };
                } else if (ticket.concertId) {
                    const concert = await getConcerts(ticket.concertId);
                    return { ...ticket, concert: concert[0] };
                } else if (ticket.sportId) {
                    const sport = await getSports(ticket.sportId);
                    return { ...ticket, sport: sport[0] };
                }
                return ticket;
            });

            const updatedTickets = await Promise.all(ticketPromises);

            const groupedTickets = groupBy(updatedTickets, (ticket) => {
                return `${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`;
            });

            if (callback) {
                callback();
            }

            setUpdatedCart({ ...fetchedCart, tickets: flatMap(groupedTickets, (group) => group) });
            setUpdatedTicketsGroups(Object.values(groupedTickets));
        } else {
            setUpdatedCart(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const calculateTotal = () => {
        if (!updatedCart) return 0;
        return updatedCart.tickets.reduce((total, ticket) => {
            if (ticket.movieId) {
                return total + (ticket.movie?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
            } else if (ticket.concertId) {
                return total + (ticket.concert?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
            } else if (ticket.sportId) {
                return total + (ticket.sport?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
            }
            return total;
        }, 0);
    };

    return (
        <div className="">
            <Container className="suc-container">

                <Table className="table-image " bordered={false} hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th><strong>Product</strong></th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    {cart && (

                        <tbody>
                            {Object.values(
                                groupBy(cart.tickets, (ticket) =>
                                    `${ticket.movieId || ticket.concertId}_${ticket.ticketType}`
                                )
                            ).map((ticketsGroup: any) => {
                                if (!ticketsGroup || ticketsGroup.length === 0) {
                                    return null;
                                }
                                const ticket = ticketsGroup[0];
                                const ticketTypeLabel = ticket.ticketType
                                    .replace("_", " ")
                                    .toLowerCase()
                                    .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase());
                                const eventName = ticket.movie
                                    ? ticket.movie.name
                                    : ticket.concert
                                        ? ticket.concert.name
                                        : ticket.sport.name;

                                const imageUrl = ticket.movie
                                    ? ticket.movie.imageUrl
                                    : ticket.concert
                                        ? ticket.concert.imageUrl
                                        : ticket.sport.imageUrl;


                                return (
                                    <tr key={`${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`}>
                                        <td className="w-25">
                                            <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                <img src={imageUrl} className="w-100 img-fluid img-thumbnail" alt="Event" />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            {eventName} {ticketTypeLabel}
                                        </td>
                                        <td>
                                            {(
                                                ticket.movie
                                                    ? ticket.movie.getPrice(ticket.ticketType)
                                                    : ticket.concert
                                                        ? ticket.concert.getPrice(ticket.ticketType)
                                                        : ticket.sport.getPrice(ticket.ticketType)
                                            ) * (updatedCart?.tickets.find(t => t.id === ticket.id)?.quantity || ticket.quantity)}
                                        </td>

                                        <td className="qty">
                                            <div className="d-flex align-items-center">

                                                <div className="form-outline">
                                                    <input
                                                        id="form1"
                                                        name="quantity"
                                                        value={updatedCart?.tickets.find(t => t.id === ticket.id)?.quantity || ticket.quantity}
                                                        type="text"
                                                        className="form-control"
                                                        readOnly
                                                    />

                                                    <label className="form-label" htmlFor="form1">Quantity</label>
                                                </div>


                                            </div>

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    )}


                </Table>


            </Container>

            <div className="suc-gradient-custom-footer p-3 mt-5 rounded">
                <h4 className="text-center text-white mb-0">Thank you for your purchase!</h4>
            </div>

        </div >
    );
}
