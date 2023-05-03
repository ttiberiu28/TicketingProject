// SuccessEmail.tsx
import React from 'react';
import { Table } from 'react-bootstrap';
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

            const imageUrl = ticket.movie
                ? ticket.movie.imageUrl
                : ticket.concert
                    ? ticket.concert.imageUrl
                    : ticket.sport.imageUrl;

            return (
                <tr key={`${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`}>
                    <td className="w-25">
                        <img src={imageUrl} className="w-100 img-fluid img-thumbnail" alt="Event" />
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
                        ) *
                            (cart?.tickets.find((t) => t.id === ticket.id)?.quantity || ticket.quantity)}
                    </td>

                    <td className="qty">
                        <input
                            id="form1"
                            name="quantity"
                            value={cart?.tickets.find((t) => t.id === ticket.id)?.quantity || ticket.quantity}
                            type="text"
                            className="form-control"
                            readOnly
                        />
                    </td>
                </tr>
            );
        });
    };

    return (
        <Table className="table-image" bordered={false} hover>
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
        </Table>
    );
};

export default SuccessEmail;
