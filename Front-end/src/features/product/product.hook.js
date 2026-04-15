import { useEffect } from "react";
import { useState } from "react"
import { getProductByIdService, getProductFilterService, getProductReviewService, getProductsByCatIdService, getProductsByCatSubIdService, getProductService } from "./product.service";


// - view product
// - recommendation 
// - search Product 

export const useProducts = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const load = async () => {
            try {
                setLoading(true);
                const res = await getProductService();
                setProducts(res.products);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }
        load();
    }, [])

    return {
        loading,
        error,
        products
    }


}
export const useProductsFilter = (keyword, sort) => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const load = async () => {
            try {
                setLoading(true);
                const res = await getProductFilterService(keyword, sort);
                console.log("Response product is filter", res);
                setProducts(res.products);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }
        load();
    }, [keyword, sort])

    return {
        loading,
        error,
        products
    }


}

export const useProductId = (id) => {
    console.log("Useproduct called");

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("id from useEffect ", id)

        if (!id) return;

        let isMounted = true;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                console.log("Enter in loadproduct servoce ", id);

                const res = await getProductByIdService(id);

                if (!isMounted) return;

                console.log("Product by id result is ", res);

                setProduct(res.product);

            } catch (err) {

                if (!isMounted) return;

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
                );

            } finally {

                if (isMounted) setLoading(false);

            }
        };

        loadProduct();

        return () => {
            isMounted = false;
        };

    }, [id]);

    return {
        loading,
        product,
        error,
    };
};

export const useCreateProduct = (id) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await getProductByIdService(id);
                setProduct(res.product);


            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }
        loadProduct();

    }, [id]);

    return {
        loading,
        product,
        error
    }
}

// Review hook use karenge sabhi product ka review
export const useReview = (productId) => {

    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState("");

    const load = async (id) => {
        if (!id) return;

        try {
            setLoading(true);
            const res = await getProductReviewService(id);
            console.log("Review from hook is ", res);
            setReviews(res.reviews);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(productId);
    }, [productId]);   // productId dependency

    return {
        loading,
        error,
        reviews
    };
};

// Categrory products ---cache karke rakh sakte hai 
export const useCategoryProduct = (catId, subId) => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [subProducts, setSubProducts] = useState([]);

    const [error, setError] = useState("");

    const load = async () => {
        try {
            setLoading(true);
            setError("")

            if (!catId) {
                const res = await getProductService();
                setProducts(res.products || []);
                setSubProducts([]);
                return;
            }

            if (subId) {
                const res = await getProductsByCatSubIdService(catId, subId);
                console.log("Sub category hook is ", res);
                setSubProducts(res.products);
                setProducts([]);
            } else {
                const res = await getProductsByCatIdService(catId);
                setProducts(res.products || []);
                setSubProducts([]);
            }


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [catId, subId]);   // productId dependency

    return {
        loading,
        error,
        products,
        subProducts
    };
};

