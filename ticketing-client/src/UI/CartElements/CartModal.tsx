import '../CSS/CartModal.css';
import { Modal, Button, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import RestClient from '../../REST/RestClient';

// needs modification for every entity added to cart
import { getMovies, getConcerts } from '../../api/api';

import { TicketType } from '../TicketType';
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

      const ticketPromises = fetchedCart.tickets.map(async (ticket) => {
        if (ticket.movieId) {
          const movie = await getMovies(ticket.movieId);
          return { ...ticket, movie: movie[0] };
        } else if (ticket.concertId) {
          const concert = await getConcerts(ticket.concertId);
          return { ...ticket, concert: concert[0] };
        }
        return ticket;
      });

      const updatedTickets = await Promise.all(ticketPromises);
      // console.log("Updated tickets:", updatedTickets);

      const groupedTickets = groupBy(updatedTickets, (ticket) => {
        return `${ticket.movieId || ticket.concertId}_${ticket.ticketType}`;
      });
      // console.log("Grouped tickets:", groupedTickets);

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
    // console.log("Cart details:", cart);
    if (cart) {
      cart.tickets.forEach((ticket) => {
        console.log("Movie details for ticket:", ticket.movie);
      });
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.tickets.reduce((total, ticket) => {
      if (ticket.movieId) {
        return total + (ticket.movie?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
      } else if (ticket.concertId) {
        return total + (ticket.concert?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
      }
      return total;
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

  const handleDelete = async (ticketId: number) => {
    console.log("Deleting ticketId:", ticketId);
    await RestClient.deleteTicketById(ticketId);
    fetchCart();
  };


  // console.log("Cart:", cart);

  return (
    <>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo "></i>
      <i className="fas fa-solid fa-hippo "></i>
      <i className="fas fa-solid fa-hippo "></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-solid fa-hippo text-white" onClick={handleShow}></i>
      <i className="fas fa-shopping-cart text-white" onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="border-bottom-0 gradient-custom">
          <Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Table bordered={false} hover>
            <thead>
              <tr>
                <th></th>
                <th><strong>Product</strong></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Row</th>
                <th>Seat</th>
                <th>Actions</th>
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
                  const eventName = ticket.movie ? ticket.movie.name : ticket.concert.name;
                  const imageUrl = ticket.movie
                    ? ticket.movie.imageUrl
                    : ticket.concert.imageUrl;

                  return (
                    <tr key={`${ticket.movieId || ticket.concertId}_${ticket.ticketType}`}>
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
                        {(ticket.movie
                          ? ticket.movie.getPrice(ticket.ticketType)
                          : ticket.concert.getPrice(ticket.ticketType)) *
                          ticket.quantity}
                      </td>
                      <td className="qty">
                        <div className="d-flex align-items-center">
                          <Button className="btn  px-3 me-2" onClick={() => handleDecrement(ticket.id)}>
                            <i className="fas fa-minus"></i>
                          </Button>

                          <div className="form-outline">
                            <input
                              id="form1"
                              name="quantity"
                              value={ticketsGroup.reduce(
                                (total: number, t: Ticket) => total + t.quantity,
                                0
                              )}
                              type="text"
                              className="form-control"
                              readOnly
                            />
                            <label className="form-label" htmlFor="form1">Quantity</label>
                          </div>

                          <Button className="btn px-3 ms-2" onClick={() => handleIncrement(ticket.id)}>
                            <i className="fas fa-plus"></i>
                          </Button>
                        </div>
                      </td>

                      <td>{ticket.row}</td>
                      <td>{ticket.seatNumber}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(ticket.id)}>
                          <i className="fa fa-times"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

          </Table>

          <div className="d-flex justify-content-between align-items-center">

            <h5 className='text-right total-text'>
              Total: <span className="price text-success">{calculateTotal()}</span>
            </h5>

            <div className="d-flex align-items-center">
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa" />
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-top-0 d-flex justify-content-between gradient-custom-footer">
          <Button variant="secondary fas fa-long-arrow-alt-left me-2" onClick={handleClose}></Button>
          <Button variant="success">Checkout</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

