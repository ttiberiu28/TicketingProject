import './CSS/CartModal.css';
import { Modal, Button, Table } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie';
import { getMovies } from '../api/api';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Cart } from "../interfaces/Cart";
import RestClient from '../REST/RestClient';



export default function CartModal() {
  const [show, setShow] = useState(false);
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0]));
  }, [index]);

  if (!movie) {
        return <div>Loading...</div>;
  }

  const handleShow = async () => {
    const userIdString = localStorage.getItem("userId");

    if (!userIdString) {
      console.error("User not logged in");
      return;
    }

    const userId = parseInt(userIdString);

    try {
      const fetchedCart = await RestClient.getCart(userId);
      setCart(fetchedCart);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }

    setShow(true);
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
                  <td>{ticket.movie?.price}</td>
                  <td className="qty">
                    {/* Update the input value according to your logic */}
                    <input
                      type="text"
                      className="form-control"
                      value="1"
                    />
                  </td>
                  <td>{ticket.movie?.price /* Multiply by quantity */}</td>
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
              Total: <span className="price text-success"></span>
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
