import './CSS/CartModal.css';
import { Modal, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Cart } from "../interfaces/Cart";
import RestClient from '../REST/RestClient';
import { getMovies } from '../api/api';

export default function CartModal() {
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);

  const handleClose = () => setShow(false);

  const userIdString = localStorage.getItem("userId");
  const userId = userIdString ? parseInt(userIdString) : null;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      const fetchedCart = await RestClient.getCart(userId);

      if (fetchedCart) {
        // Fetch movie details for each ticket and add them to the ticket objects
        const ticketPromises = fetchedCart.tickets.map(async (ticket) => {
          const movie = await getMovies(ticket.movieId);
          return { ...ticket, movie: movie[0] };
        });

        const updatedTickets = await Promise.all(ticketPromises);

        setCart({ ...fetchedCart, tickets: updatedTickets });
      } else {
        setCart(null);
      }
    };

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
      return total + (ticket.movie?.getPrice(ticket.ticketType) || 0);
    }, 0);
  };

  return (
    <>
      <i className="fas fa-shopping-cart text-white" onClick={handleShow}></i>

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
                <th>Total</th>
                <th>Date</th>
                <th>Row</th>
                <th>Seat</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            {cart && (
              <tbody>
                {cart.tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="w-25">
                      <img
                        src={ticket.movie?.imageUrl}
                        className="img-fluid img-thumbnail"
                        alt="Movie"
                      />
                    </td>
                    <td>{ticket.movie?.name}</td>
                    <td>{ticket.movie?.getPrice(ticket.ticketType)}</td>
                    <td className="qty">
                      <input
                        type="text"
                        className="form-control"
                        value="1"
                        readOnly
                      />
                    </td>
                    <td>{ticket.movie?.getPrice(ticket.ticketType)}</td>
                    <td>{ticket.date.toLocaleDateString()}</td>
                    <td>{ticket.row}</td>
                    <td>{ticket.seatNumber}</td>
                    <td>{ticket.ticketType}</td>
                    <td>
                      <Button variant="danger" size="sm">
                        <i className="fa fa-times"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
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
}
