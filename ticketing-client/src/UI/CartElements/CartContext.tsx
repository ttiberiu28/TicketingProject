import React, { createContext, useState, useContext } from "react";
import { Cart } from "../../interfaces/Cart";

interface CartContextProps {
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

