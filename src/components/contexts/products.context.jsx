import { createContext, useState } from 'react';
import PRODUCTS from '../../test-db/shop-data.json';

export const ProductContext = createContext({
    products: [],
});

export const ProductProvider = ({children}) => {

    const [products, setProducts] = useState(PRODUCTS)
    const value = {products}

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};