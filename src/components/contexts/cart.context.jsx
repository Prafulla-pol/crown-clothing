import { createContext, useState } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    toggleCartOpen: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, toggleCartOpen] = useState(false);
    const value = {isCartOpen, toggleCartOpen};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

