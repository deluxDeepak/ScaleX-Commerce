import { useState } from "react";
import { createProductApi, getMyProductAPi, registerSellerApi } from "./seller.api";

// future validation route 
export const registerSellerService = async (data) => {
    const res = await registerSellerApi(data);
    return res.user
}


// Create product seller (form data bhej do  baki axios handle kar lega )
export const createProductService = async (data) => {
    try {
        const res = await createProductApi(data);
        return res.data
    } catch (error) {
        throw new Error("Error in creating product", error);

    }

}

//Get product of the seller 
export const getMyProductService = async () => {
    try {
        const res = await getMyProductAPi();
        return res.data;
    } catch (error) {
        throw new Error("Error in product fetching", error);

    }

}