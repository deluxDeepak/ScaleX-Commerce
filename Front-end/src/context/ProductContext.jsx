import React, { createContext, useEffect, useState } from 'react'
import { getProductService } from '../features/product/product.service';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setError("");
            setLoading(false);
            const res = await getProductService();
            console.log("Product is ", res);
            setProducts(res.products);

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider