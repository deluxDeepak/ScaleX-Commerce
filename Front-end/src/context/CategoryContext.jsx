import React, { createContext, useEffect, useState } from 'react'
import { getCategories, getSubCategories } from '../core/services/category.service';


export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Automatically karna karna hai 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError("");
                const resCategory = await getCategories();
                setCategory(resCategory);
                console.log("Categoris is ", resCategory);
                
                const resSubCategory = await getSubCategories();
                setSubCategory(resSubCategory);
                console.log("Subegoris is ", resSubCategory);

            } catch (error) {
                setError(error.message || "Something went wrong wait till");

            } finally {
                setLoading(false);
            }
        }

        fetchCategories();

    }, [])
    return (
        <CategoryContext.Provider value={{
            loading,
            error,
            category,
            subCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;