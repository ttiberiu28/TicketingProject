// SuccessEmail.tsx
import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { Cart } from '../../interfaces/Cart';
import { groupBy } from 'lodash';


interface SuccessEmailProps {
    cart: Cart | null;
}

const SuccessEmail: React.FC<SuccessEmailProps> = ({ cart }) => {
    const renderTableBody = () => {
        if (!cart) return null;

        return Object.values(
            groupBy(cart.tickets, (ticket: { movieId: any; concertId: any; ticketType: any; }) =>
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

            // const imageUrl = ticket.movie
            //     ? ticket.movie.imageUrl
            //     : ticket.concert
            //         ? ticket.concert.imageUrl
            //         : ticket.sport.imageUrl;

            return (
                <tr key={`${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`}>
                    {/* <td className="w-25">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img
                                src={imageUrl}
                                style={{ height: '70px', width: '45px', objectFit: 'cover' }}
                                alt="Event"
                            />


                            <a href="#!">
                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                            </a>
                        </div>
                    </td> */}
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
                        ) *
                            (cart?.tickets.find((t) => t.id === ticket.id)?.quantity || ticket.quantity)}
                    </td>

                    <td className="qty">
                        <div className="d-flex align-items-center">
                            <div className="form-outline">
                                <input
                                    id="form1"
                                    name="quantity"
                                    value={cart?.tickets.find((t) => t.id === ticket.id)?.quantity || ticket.quantity}
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
        });
    };

    return (
        <BootstrapTable responsive className="" bordered={false} hover>
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <strong>Product</strong>
                    </th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            {cart && <tbody>{renderTableBody()}</tbody>}
        </BootstrapTable>
    );
};

export default SuccessEmail;
