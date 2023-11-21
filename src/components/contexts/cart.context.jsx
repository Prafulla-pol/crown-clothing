import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    toggleCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, toggleCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
      const newCount = cartItems.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      setCartCount(newCount)
    }, [cartItems])
    

    const addItemToCart = (productToAdd) => {
        const existingItem = cartItems.find(item => item.id === productToAdd.id);
        if(existingItem) {
            const updatedItems = cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item);
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, {...productToAdd, quantity: 1}]);
        }
    }

    const value = {isCartOpen, toggleCartOpen, cartItems, addItemToCart, cartCount};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

