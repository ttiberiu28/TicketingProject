import '../CSS/CartModal.css';
import { Modal, Button, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Cart } from "../../interfaces/Cart";
import RestClient from '../../REST/RestClient';
import { getMovies } from '../../api/api';
import { TicketType } from '../MovieComponents/Movie';
import { groupBy, flatMap } from "lodash";
import { useCart } from './CartContext';
import { Ticket } from '../../interfaces/Ticket';

export default function CartModal() {

    const [show, setShow] = useState(false);
    const { cart, setCart } = useCart();

    const handleClose = () => setShow(false);

    const userIdString = localStorage.getItem("userId");
    const userId = userIdString ? parseInt(userIdString) : null;

    const fetchCart = async () => {
        if (!userId) return;

        const fetchedCart = await RestClient.getCart(userId);

        if (fetchedCart) {
            // Fetch movie details for each ticket and add them to the ticket objects
            const ticketPromises = fetchedCart.tickets.map(async (ticket) => {
                const movie = await getMovies(ticket.movieId);
                return { ...ticket, movie: movie[0] };
            });

            const updatedTickets = await Promise.all(ticketPromises);
            console.log("Updated tickets:", updatedTickets);

            const groupedTickets = groupBy(updatedTickets, (ticket) => {
                return `${ticket.movieId}_${ticket.ticketType}`;
            });
            console.log("Grouped tickets:", groupedTickets);

            setCart({ ...fetchedCart, tickets: flatMap(groupedTickets, (group) => group) });
        } else {
            setCart(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const handleShow = async () => {
        if (!userId) {
            console.error("User not logged in");
            return;
        }

        setShow(true);

        // Add the following log statements to help debug
        console.log("Cart details:", cart);
        if (cart) {
            cart.tickets.forEach((ticket) => {
                console.log("Movie details for ticket:", ticket.movie);
            });
        }
    };

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.tickets.reduce((total, ticket) => {
            return total + (ticket.movie?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
        }, 0);

    };

    const handleIncrement = async (ticketId: number) => {
        console.log("Incrementing ticketId:", ticketId);
        await RestClient.incrementTicketQuantity(ticketId);
        fetchCart();
    };

    const handleDecrement = async (ticketId: number) => {
        console.log("Decrementing ticketId:", ticketId);
        await RestClient.decrementTicketQuantity(ticketId);
        fetchCart();
    };

    console.log("Cart:", cart);

    return (
        <>
            <Button variant="btn btn-secondary fas fa-shopping-cart " onClick={handleShow} style={{ width: '300px' }}>
                View Cart
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton className="border-bottom-0">
                    <Modal.Title>Your Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered={false} hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Row</th>
                                <th>Seat</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {cart && (
                            <tbody>
                                {Object.values(groupBy(cart.tickets, ticket => `${ticket.movieId}_${ticket.ticketType}`)).map((ticketsGroup: any) => {
                                    if (!ticketsGroup || ticketsGroup.length === 0) {
                                        return null;
                                    }
                                    const ticket = ticketsGroup[0];
                                    const ticketTypeLabel =
                                        ticket.ticketType === TicketType.STANDARD_2D
                                            ? "2D"
                                            : ticket.ticketType === TicketType.STANDARD_3D
                                                ? "3D"
                                                : ticket.ticketType;
                                    return (
                                        <tr key={`${ticket.movieId}_${ticket.ticketType}`}>
                                            <td className="w-25">
                                                <img
                                                    src={ticket.movie?.imageUrl}
                                                    className="img-fluid img-thumbnail"
                                                    alt="Movie"
                                                />
                                            </td>
                                            <td>
                                                {ticket.movie?.name} {ticketTypeLabel}
                                            </td>
                                            <td>{ticket.movie?.getPrice(ticket.ticketType) * ticket.quantity}</td>
                                            <td className="qty">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => handleIncrement(ticket.id)}
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </Button>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={ticketsGroup.reduce((total: number, t: Ticket) => total + t.quantity, 0)}
                                                    readOnly
                                                />

                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => handleDecrement(ticket.id)}
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </Button>
                                            </td>

                                            <td>{ticket.row}</td>
                                            <td>{ticket.seatNumber}</td>
                                            <td>
                                                <Button variant="danger" size="sm">
                                                    <i className="fa fa-times"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}

                    </Table>
                    <div className="d-flex justify-content-end">
                        <h5>
                            Total: <span className="price text-success">{calculateTotal()}</span>
                        </h5>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-top-0 d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success">Checkout</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

