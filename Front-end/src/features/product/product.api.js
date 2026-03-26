import { api } from "../../core/api/client"

// - get product 
// - view product 
export const getProductApi = async () => {
    return await api.get("/product");
}
// /product/filter?search=mobile
/*
export const getProductFilterApi = async (keyword) => {
    return await api.get(`/product/filter?search=${keyword}`);
}
export const getProductFilterPriceIncApi = async (keyword) => {
    return await api.get(`/product/filter?search=${keyword}&sort=price`);
}
export const getProductFilterPriceDecApi = async (keyword) => {
    return await api.get(`/product/filter?search=${keyword}&sort=-price`);
}
*/

export const getProductFilterApi = async (keyword, sort) => {
    let url = `/product/filter?`;
    if (keyword) {
        url += `search=${keyword}&`;
    }

    if (sort) {
        url += `sort=${sort}`;
    }
    return await api.get(url);
};

// Suggestion products ===============
// router.get("/suggestion", getProductsSuggestion); //header 
export const getProductSuggestionApi = async (keyword) => {
    return await api.get(`/product/suggestion`, {
        params: { keyword }
    })

}

export const getProductByIdApi = async (id) => {

    return await api.get(`/product/${id}`);
}
// =========================================================================
// router.get("/:productId", getProductReviews);   //Done
// Product review fetch karna parega 
export const getProductReviewApi = async (productId) => {
    return await api.get(`/review/${productId}`);
}


// category/69c2534bfb19b46ed4dcba16/product
export const getProductsByCatIdApi = async (catId) => {
    return await api.get(`/category/${catId}/product`);

}

// router.get("/:catId/sub/:subCatId/product", getProductByCatIDSubcategory);
export const getProductsByCatSubIdApi = async (catId, subId) => {
    return await api.get(`/category/${catId}/sub/${subId}/product`);

}




