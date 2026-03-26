import React, { useEffect, useState } from 'react'
import { getSubCategoriesByCatId } from '../services/category.service';

const useSubCategory = (categoryId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {

        if (!categoryId) return;

        const fetchSub = async () => {

            try {
                setLoading(true);
                setError("");
                const res = await getSubCategoriesByCatId(categoryId);
                console.log("Subcategory from hook", res);
                setSubCategory(res.subCategory);
            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchSub();

    }, [categoryId]);
    return {
        loading,
        error,
        subCategory

    }
}

export default useSubCategory