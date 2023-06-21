// SuccessEmail.tsx
import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { Cart } from '../../interfaces/Cart';
import { groupBy } from 'lodash';


interface SuccessEmailProps {
    cart: Cart | null;
}

const SuccessEmail: React.FC<SuccessEmailProps> = ({ cart }) => {

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.tickets.reduce((total, ticket) => {
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
            return (
                <tr key={`${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`}>

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
        <>
            <BootstrapTable responsive className="" bordered={false} hover>
                {cart && <tbody>{renderTableBody()}</tbody>}
            </BootstrapTable>
            <p></p>
            <p>This email represents the validity of your purchase.</p>
            <div>
                <strong>Total Price: </strong>
                {calculateTotal()}
            </div>
        </>
    );
};

export default SuccessEmail;
