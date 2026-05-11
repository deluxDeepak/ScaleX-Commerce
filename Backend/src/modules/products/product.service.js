const mongoose = require("mongoose");
const logger = require("../../core/logger/logger");
const DatabaseError = require("../../shared/errors/DatabaseError");
const ValidationError = require("../../shared/errors/ValidationError");
const { findAllProduct, findProductByid, createProduct, updateProductById, deleteProductById, updateProductImg, deleteProductImg, findProductBySellerId, findFilterProduct, findProductSuggestion, updateStock } = require("./product.repository");
const { NotfoundError } = require("../../shared/errors");

const getAllProductsService = async (params) => {

    try {

        logger.info({ params }, "Fetching products with query params");
        const result = await findAllProduct(params);

        // `findAllProduct` returns an array of products (mongoose query result),
        // not an object with a `data` field.
        if (!Array.isArray(result) || result.length === 0) {
            logger.warn("No products found");
            return [];
        }
        return result;

    } catch (err) {
        logger.error(err, "Error in getAllProducts service");
        throw new DatabaseError("Failed to fetch products from database");

    }

};

// Query manage here 
const getFilterProductsService = async (queryParams) => {

    try {

        logger.info({ queryParams }, "Fetching products with query queryParams");
        const result = await findFilterProduct(queryParams);

        // `findAllProduct` returns an array of products (mongoose query result),
        // not an object with a `data` field.
        if (!Array.isArray(result) || result.length === 0) {
            logger.warn("No products found");
            return [];
        }
        return result;

    } catch (err) {
        logger.error(err, "Error in getAllProducts service");
        throw new DatabaseError("Failed to fetch products from database");

    }

};
const getProductsSuggestionService = async (keyword) => {

    try {

        logger.info({ keyword }, "Fetching products with query keyword");
        const result = await findProductSuggestion(keyword);

        // `findAllProduct` returns an array of products (mongoose query result),
        // not an object with a `data` field.
        if (!Array.isArray(result) || result.length === 0) {
            logger.warn("No products found");
            return [];
        }
        return result;

    } catch (err) {
        logger.error(err, "Error in getAllProducts service");
        throw new DatabaseError("Failed to fetch products from database");

    }

};

const getProductByIdService = async (productId) => {
    if (!productId) {
        throw new ValidationError("Product productId is required");
    }

    const product = await findProductByid(productId);
    if (!product) {
        throw new DatabaseError("Product not found || not persent");
    }
    return product;


}

// Get product by sellerId
const getMyProductsService = async (sellerId) => {
    if (!sellerId) {
        throw new ValidationError("Seller id is required");
    }
    // 1.verify the seller frist 

    // 2. Find the seller products 
    // Multiple products of a seller 
    const products = await findProductBySellerId(sellerId);
    if (!products || products.length == 0) {
        return [];
    }
    return products;


}
const createProductService = async (data, urls = []) => {
    if (!data || typeof data !== "object") {
        throw new ValidationError("Product payload is required");
    }
    if (!data.title) {
        throw new ValidationError("Product name or title is required");
    }
    if (!data.category || !data.subCategory) {
        throw new ValidationError("Category and Subcategory is required");
    }
    if (data.stock === undefined || data.stock === null) {
        throw new ValidationError("Stock is required");
    }
    if (data.price === undefined || data.price === null) {
        throw new ValidationError("Price is required");
    }
    if (!data.seller) {
        throw new ValidationError("Seller is required");
    }

    if (!mongoose.Types.ObjectId.isValid(data.category)) {
        throw new ValidationError("Category must be a valid ObjectId");
    }
    if (!mongoose.Types.ObjectId.isValid(data.subCategory)) {
        throw new ValidationError("Subcategory must be a valid ObjectId");
    }
    if (!mongoose.Types.ObjectId.isValid(data.seller)) {
        throw new ValidationError("Seller must be a valid ObjectId");
    }
    // pick feild from vlidate or request (safe karne ke liye validation nahi to user jo required nahi hai wo bhi dal dega )
    const product = {
        title: data.title,
        category: data.category,
        subCategory: data.subCategory,
        stock: data.stock,
        seller: data.seller,
        price: data.price,
        slug: data.slug,
        description: data.description,   //optional
        features: data.features || [],  //Optional
        images: urls?.length ? urls : [],   //Update image sath me 
        oldPrice: data.oldPrice, //optional

    }

    try {
        const result = await createProduct(product);
        return result;
    } catch (error) {
        logger.error({ error }, "Error in createProductservice ");
        if (error?.name === "ValidationError" || error?.name === "CastError") {
            throw new ValidationError(error.message);
        }
        throw new DatabaseError("Failed to create products in database");

    }
}

// Usign transation in mongodb 
const reduceStockService = async (productId, qty, type, session) => {
    const product = await findProductByid(productId);
    if (!product) {
        throw new NotfoundError("Product not found");
    }

    if (product.stock < qty) {
        throw new ValidationError("Product is out of Stock")
    }

    const result = await updateStock(productId, type, qty, session);
    return result;
}

const updateProductService = async (id, data) => {
    // verify the data 

    if (!id) {
        throw new ValidationError("Product id required");
    }

    const allowedFields = [
        "features",
        "description",
        "stock",
        "price",
        "oldPrice"
    ];
    const updateData = {};

    for (let key of allowedFields) {
        if (data[key] !== undefined) {
            updateData[key] = data[key]
        }
    }

    // Ab empty update request na kare 
    if (Object.keys(updateData).length === 0) {
        throw new ValidationError("No valid fields to update");
    }



    try {
        // const product = await findProductByid(id);
        // if (!product) {
        //     throw new DatabaseError("Product not found");
        // }
        const result = await updateProductById(id, updateData);
        if (!result) {
            throw new DatabaseError("Product not found");
        }
        return result;

    } catch (error) {
        logger.error({ error }, "Error in updateProduct ");
        throw error;


    }
}

const adminUpdateProductService = async (id, data) => {
    if (!id) {
        throw new ValidationError("Product id is required");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new ValidationError("Update data is required");
    }

    try {
        // Only admin-controlled fields is allowed
        const allowedFields = [
            "section",
            "category",
            "featured",
            "isActive",
            "tags"
        ];

        const filteredData = {};

        for (const key of allowedFields) {
            if (data[key] !== undefined) {
                filteredData[key] = data[key];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new ValidationError(
                "No valid admin fields provided for update"
            );
        }

        const updatedProduct = await updateProductById(id, filteredData);

        if (!updatedProduct) {
            throw new DatabaseError("Product not found");
        }

        logger.info(
            {
                productId: id,
                updatedFields: Object.keys(filteredData),
            },
            "Product updated successfully by admin"
        );

        return updatedProduct;

    } catch (error) {
        logger.error(
            {
                error: error.message,
                stack: error.stack,
                productId: id,
                payload: data,
            },
            "Error while updating product"
        );

        throw error;
    }
};



const deleteProductService = async (id) => {
    if (!id) {
        throw new ValidationError("Product is required");
    }

    try {
        const result = await deleteProductById(id);
        if (!result) {
            throw new DatabaseError("Product not Found");
        }
        return result;

    } catch (error) {
        logger.error({ error }, "Error in Deletion of product ");
        throw error;

    }
}

// =============Images ==========
const addProductImageService = async (id, images) => {
    if (!id) {
        throw new ValidationError("Product is required")
    }
    const product = await findProductByid(id);
    if (!product) {
        throw new DatabaseError("Product not found");
    }

    // images array hona chiye 
    if (!images || !Array.isArray(images)) {
        throw new ValidationError("Images are required || Images should be array");
    }

    // const result=await product.push(images);    //push new images delete old one 
    // await result.save();
    try {
        const result = await updateProductImg(id, images);
        if (!result) {
            throw new DatabaseError("Product not found");
        }
        return result;
    } catch (error) {
        logger.error({ error }, "Error in Deletion of Image ");
        throw error;

    }

}

const deleteProductImageService = async (id, imagesUrl) => {
    if (!id) {
        throw new ValidationError("Product is required")
    }

    // images array hona chiye 
    if (!imagesUrl) {
        throw new ValidationError("Images are required");
    }

    try {
        const result = await deleteProductImg(id, imagesUrl);
        if (!result) {
            throw new DatabaseError("Product not found ");
        }
        return result;
    } catch (error) {
        logger.error({ error }, "Error in Deletion of Image ");
        throw error;


    }

}

module.exports = {
    getAllProductsService,
    getFilterProductsService,
    getProductsSuggestionService,
    getProductByIdService,
    getMyProductsService,
    createProductService,
    updateProductService,
    adminUpdateProductService,
    deleteProductService,
    reduceStockService,

    // Image 
    addProductImageService,
    deleteProductImageService
};