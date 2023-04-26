import '../CSS/CartModal.css';
import { Modal, Button, Table, FormControl } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import RestClient from '../../REST/RestClient';

// needs modification for every entity added to cart
import { getMovies, getConcerts } from '../../api/api';
import { TicketType } from '../TicketType';
import { groupBy, flatMap } from "lodash";
import { useCartContext } from './CartContext';
import { Ticket } from '../../interfaces/Ticket';
import { Seat } from '../../interfaces/Seat';
import { Dropdown } from 'react-bootstrap';
import { Cart } from '../../interfaces/Cart';
import { useNavigate } from 'react-router-dom';

export default function CartModal() {

  const [show, setShow] = useState(false);
  const [updatedCart, setUpdatedCart] = useState<Cart | null>(null);
  const [updatedTicketsGroups, setUpdatedTicketsGroups] = useState<any[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const { cart, setCart } = useCartContext();

  const handleClose = () => {
    setShow(false);
    fetchCart();
  }

  const navigate = useNavigate();

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
        }
        return ticket;
      });

      const updatedTickets = await Promise.all(ticketPromises);
      // console.log("Updated tickets:", updatedTickets);

      const groupedTickets = groupBy(updatedTickets, (ticket) => {
        return `${ticket.movieId || ticket.concertId}_${ticket.ticketType}`;
      });
      // console.log("Grouped tickets:", groupedTickets);

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

  const handleShow = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    setShow(true);
    fetchCart();

    if (cart) {
      cart.tickets.forEach((ticket) => {
        console.log("Movie details for ticket:", ticket.movie);
      });
    }
  };

  const calculateTotal = () => {
    if (!updatedCart) return 0;
    return updatedCart.tickets.reduce((total, ticket) => {
      if (ticket.movieId) {
        return total + (ticket.movie?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
      } else if (ticket.concertId) {
        return total + (ticket.concert?.getPrice(ticket.ticketType) || 0) * ticket.quantity;
      }
      return total;
    }, 0);
  };

  const getTotalItems = () => {
    if (!cart) return 0;

    const totalItems = cart.tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
    return totalItems;
  };



  const updateTicketQuantity = (ticketId: number, quantity: any) => {
    setUpdatedCart((prevCart) => {
      if (!prevCart) {
        return null;
      }

      const updatedTickets = prevCart.tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return { ...ticket, quantity };
        }
        return ticket;
      });

      return { ...prevCart, tickets: updatedTickets, id: prevCart.id };
    });
  };


  const handleIncrement = async (ticketId: number) => {
    console.log("Incrementing ticketId:", ticketId);
    await RestClient.incrementTicketQuantity(ticketId);
    if (updatedCart) {
      const foundTicket = updatedCart.tickets.find((t) => t.id === ticketId);
      if (foundTicket) {
        updateTicketQuantity(ticketId, foundTicket.quantity + 1);
      }
    }
  };

  const handleDecrement = async (ticketId: number, seatId?: number) => {
    console.log("Decrementing ticketId:", ticketId);

    if (seatId) {
      const foundTicket = updatedCart?.tickets.find((t) => t.id === ticketId);
      if (foundTicket && foundTicket.quantity === 1) {
        setErrorMessage("Cannot delete the last seat.");
        return;
      }
      await RestClient.deleteSeatById(seatId);
    } else {
      await RestClient.decrementTicketQuantity(ticketId);
    }

    fetchCart(() => {
      if (updatedCart) {
        const foundTicket = updatedCart.tickets.find((t) => t.id === ticketId);
        if (foundTicket) {
          updateTicketQuantity(ticketId, foundTicket.quantity - 1);
        }
      }
    });

    setCart((prevCart) => {
      if (!prevCart) {
        return null;
      }

      return {
        ...prevCart,
        tickets: prevCart.tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            if (seatId) {
              return {
                ...ticket,
                ticketSeats: ticket.ticketSeats.filter((seat) => seat.id !== seatId),
              };
            } else {
              return {
                ...ticket,
                quantity: ticket.quantity - 1,
              };
            }
          }
          return ticket;
        }),
      };
    });

    setUpdatedTicketsGroups((prevGroups) => {
      if (!prevGroups) {
        return null;
      }

      return prevGroups.map((group) => {
        if (group[0].id === ticketId) {
          if (seatId) {
            return group.map((ticket: Ticket) => ({
              ...ticket,
              ticketSeats: ticket.ticketSeats.filter((seat) => seat.id !== seatId),
            }));
          } else {
            return group.map((ticket: Ticket) => ({
              ...ticket,
              quantity: ticket.quantity - 1,
            }));
          }
        }
        return group;
      });
    });
  };




  const handleDelete = async (ticketId: number) => {
    console.log("Deleting ticketId:", ticketId);
    await RestClient.deleteTicketById(ticketId);
    setCart((prevCart) => {
      if (!prevCart) {
        return null;
      }
      const updatedTickets = prevCart.tickets.filter((ticket) => ticket.id !== ticketId);
      return { ...prevCart, tickets: updatedTickets, id: prevCart.id };
    });

    setUpdatedCart((prevUpdatedCart) => {
      if (!prevUpdatedCart) {
        return null;
      }
      const updatedTickets = prevUpdatedCart.tickets.filter((ticket) => ticket.id !== ticketId);
      return { ...prevUpdatedCart, tickets: updatedTickets, id: prevUpdatedCart.id };
    });
  };


  // console.log("Cart:", cart);

  return (
    <>
      <span onClick={handleShow}>
        <span className="badge badge-pill bg-danger">{getTotalItems()}</span>
        <i className="fas fa-shopping-cart cart-text-color"></i>
      </span>


      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="border-bottom-0 gradient-custom">
          <Modal.Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
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
                        {(
                          ticket.movie
                            ? ticket.movie.getPrice(ticket.ticketType)
                            : ticket.concert.getPrice(ticket.ticketType)
                        ) * (updatedCart?.tickets.find(t => t.id === ticket.id)?.quantity || ticket.quantity)}
                      </td>

                      <td className="qty">
                        <div className="d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle variant="btn" className="px-3 me-2">
                              <i className="fas fa-minus"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {ticket.ticketSeats.map((seat: Seat) => (
                                <Dropdown.Item
                                  key={seat.id}
                                  onClick={() => handleDecrement(ticket.id, seat.id)}
                                >
                                  {seat.row}:{seat.seatNumber} (Delete)
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>


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

                          <Button className="btn px-3 ms-2" disabled onClick={() => handleIncrement(ticket.id)}>
                            <i className="fas fa-plus"></i>
                          </Button>
                        </div>

                      </td>

                      <td>
                        {ticket.ticketSeats.map((seat: { row: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                          <div>{seat.row}</div>
                        ))}
                      </td>
                      <td>
                        {ticket.ticketSeats.map((seat: { seatNumber: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                          <div>{seat.seatNumber}</div>
                        ))}
                      </td>


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
              Total(RON): <span className="price text-success">{calculateTotal()} </span>
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
          <Button variant="success" onClick={() => navigate('/checkout')}>Checkout</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

