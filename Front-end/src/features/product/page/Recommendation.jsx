// Show searchProduct+recommendation Paroducts 
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products';


const Recommendation = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("search") || "";
    console.log("Search params is ", query);
    const filterProducts = products.filter((p) => p.title.toLocaleLowerCase().includes(query).toLocaleLowerCase());
    
    return (
        <div>
            Header for search

        </div>
    )
}

export default Recommendation