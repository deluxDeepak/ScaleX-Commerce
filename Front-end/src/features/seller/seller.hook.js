import { useState } from "react";
import { acceptOrderService, cancelOrderService, createProductService, getMyProductService, getSellerOrderService } from "./seller.service";
import { useEffect } from "react";

export const useAddProduct = () => {

    // Intial state hai 
    const initalState = {
        // General info 
        title: "",
        description: "",
        features: "",
        // Price inventry 
        price: "",
        stock: "",
        images: [], //Array of string save string here,
        category: "",
        subCategory: "",
    }


    const [form, setForm] = useState(initalState);
    const [imageFiles, setImageFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            // Append into form data 
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            })

            // Append the images file if exist 
            imageFiles.forEach((img) => {
                formData.append("images", img);

            })

            const res = await createProductService(formData);
            setMessage(res.message || "Product added to Store suceessfully ✅");

            setForm(initalState);
            setImageFiles([]);


        } catch (error) {
            setError(error.message || "Something went wrong in adding Product ");

        } finally {
            setLoading(false);
        }

    }

    return {
        form,
        message,
        loading,
        error,
        imageFiles,
        setForm,
        handleSubmit,
        handleChange,
        setImageFiles,

    }


}

export const useSellerProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sellerProduct, setSellerProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getMyProductService();
            setSellerProduct(result.products);

        } catch (error) {
            setError(error.message || "Error in fetching the Seller Product")

        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return {
        fetchProduct,
        loading,
        error,
        sellerProduct,
    }
}




export const useSellerOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sellerOrders, setSellerOrders] = useState([]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getSellerOrderService();
            setSellerOrders(result.orders);

        } catch (error) {
            setError(error.message || "Error in fetching the Seller Order")

        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return {
        loading,
        error,
        sellerOrders
    }

}

/*
    Accept order 
    cancel order 
    update tracking
*/
export const useSellerAction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const [acceptResult, setAcceptResult] = useState([]);
    const [cancelResult, setCancelResult] = useState([]);

    const acceptOrder = async (productId) => {
        try {
            setLoading(true);
            setError("");

            const result = await acceptOrderService(productId);
            console.log("Result accepeted her ", result);
            setAcceptResult(result.result);
            setMessage({
                type: "success",
                text: "Order accepted. You can now prepare it for shipment.",
            });

        } catch (error) {
            setError(error.message || "Error in fetching the Seller Order")

        } finally {
            setLoading(true);
        }
    }


    const cancelOrder = async (productId) => {
        try {
            setLoading(true);
            setError("");

            const result = await cancelOrderService(productId);
            setCancelResult(result.result);
            setMessage({
                type: "error",
                text: "Order cancelled successfully.",
            });

        } catch (error) {
            setError(error.message || "Error in fetching the Seller Order")

        } finally {
            setLoading(true);
        }
    }


    return {
        loading,
        error,
        acceptResult,
        cancelResult,
        message,
        acceptOrder,
        cancelOrder
    }

}
