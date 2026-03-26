import { getProductApi, getProductByIdApi, getProductFilterApi, getProductReviewApi, getProductsByCatIdApi, getProductsByCatSubIdApi, getProductSuggestionApi } from "./product.api";

export const getProductService = async () => {
    try {

        const res = await getProductApi();
        return res.data
    } catch (error) {
        throw new Error("Error happen in axios backend", error);

    }
}

export const getProductFilterService = async (keyword, sort) => {
    const res = await getProductFilterApi(keyword, sort);
    return res.data;
}

// Suggestion products =======================
export const getProductSuggestionservice = async (keyword) => {
    const res = await getProductSuggestionApi(keyword);
    return res.data;

}



export const getProductByIdService = async (id) => {
    try {
        console.log("Calling the api", id);

        const res = await getProductByIdApi(id);
        return res.data
    } catch (error) {
        throw new Error("Error happen in axios backend", error);

    }
}

// Product review ==========================================================
export const getProductReviewService = async (productId) => {
    const res = await getProductReviewApi(productId);
    return res.data
}

// Product by category =====================
export const getProductsByCatIdService = async (catId) => {
    const res = await getProductsByCatIdApi(catId);
    return res.data
}

// Product by Subcategory ====================
export const getProductsByCatSubIdService = async (catId, subId) => {
    const res = await getProductsByCatSubIdApi(catId, subId);
    console.log("response call", res.data);
    return res.data
}


