import './CSS/CartModal.css';
import { Modal, Button, Table } from 'react-bootstrap';
import { Movie } from '../interfaces/Movie';
import { getMovies } from '../api/api';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export default function CartModal() {
  const [show, setShow] = useState(false);
  const { index = '0' } = useParams<{ index?: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getMovies(parseInt(index)).then((data) => setMovie(data[0]));
  }, [index]);

  if (!movie) {
        return <div>Loading...</div>;
  }

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
            <tbody>
              <tr>
                <td className="w-25">
                  <img
                    src={movie.imageUrl}
                    className="img-fluid img-thumbnail"
                    alt="Sheep"
                  />
                </td>
                <td>{movie.name}</td>
                <td>{movie.price}</td>
                <td className="qty">
                  <input
                    type="text"
                    className="form-control"
                    id="input1"
                    value="2"
                  />
                </td>
                <td>178$</td>
                <td>
                  <Button variant="danger" size="sm">
                    <i className="fa fa-times"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <h5>
              Total: <span className="price text-success">89$</span>
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
