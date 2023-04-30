import React, { createContext, useContext, useState, useEffect } from "react";
import RestClient from "../../REST/RestClient";
import { groupBy, flatMap } from "lodash";
import { getMovies, getConcerts, getSports } from "../../api/api";
import { Cart } from "../../interfaces/Cart";

interface CartContextValue {
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
    fetchCart: () => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }

    return context;
};



export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);

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

                else if (ticket.sportId) {
                    const sport = await getSports(ticket.sportId);
                    return { ...ticket, sport: sport[0] };
                }

                return ticket;
            });

            const updatedTickets = await Promise.all(ticketPromises);
            const groupedTickets = groupBy(updatedTickets, (ticket) => {
                return `${ticket.movieId || ticket.concertId || ticket.sportId}_${ticket.ticketType}`;
            });

            setCart({ ...fetchedCart, tickets: flatMap(groupedTickets, (group) => group) });
        } else {
            setCart(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
