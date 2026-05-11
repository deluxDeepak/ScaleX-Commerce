const logger = require("../../core/logger/logger");
const { uploadObjectService, deleteObjectService } = require("../../core/storage/storage.services");
const { generateKey, getKeyFromUrl } = require("../../shared/utils/genKeys.utils");
const generateSlug = require("../../shared/utils/genSlug");
const { getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService, addProductImageService, deleteProductImageService, getFilterProductsService, getProductsSuggestionService, getMyProductsService, adminUpdateProductService } = require("./product.service");

// yehan se filter bhi lagaye hai (Normal )
const getProducts = async (req, res) => {
    try {

        const products = await getAllProductsService(req.query);

        res.status(200).json({
            success: true,
            products: products,
            message: "Products fetched successfully"
        });

    } catch (error) {

        logger.error(error, "Error in getProducts");

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Apply filter in products 
const getProductsFilter = async (req, res) => {
    try {
        const queryParams = req.query
        console.log("Query params are ", queryParams);

        const products = await getFilterProductsService(queryParams);

        res.status(200).json({
            success: true,
            products: products,
            message: "Products fetched successfully"
        });

    } catch (error) {

        logger.error(error, "Error in getProducts");

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getProductsSuggestion = async (req, res) => {
    try {
        const keyword = req.query.keyword
        console.log("Query params are ", keyword);

        const products = await getProductsSuggestionService(keyword);

        res.status(200).json({
            success: true,
            products: products,
            message: "Products fetched successfully"
        });

    } catch (error) {

        logger.error(error, "Error in getProducts");

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);
        res.status(200).json({
            success: true,
            product: product,
            message: "Product feteched successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in fetching product")
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
// Seller products (Products added by the seller )
const getMyProducts = async (req, res) => {
    const sellerId = req.user.id
    console.log("Seller id is ", sellerId);
    // 69eadd87f0d31f9018aa8a14
    try {
        const products = await getMyProductsService(sellerId);
        res.status(200).json({
            success: true,
            products: products,
            message: "Product feteched successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in fetching product")
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
const createProduct = async (req, res) => {
    // 1.seller id chaiye 
    const sellerId = req.user.id;
    // 2.data of the product
    const data = req.body;

    // ** Add slug to the product for better searching **
    const slug = generateSlug(data.title);

    // 3.make data for backend (json)
    const productData = {
        ...data,
        seller: sellerId,
        slug: slug
    }

    // 4.Add files also at same time 
    const files = req.files;
    console.log("req files is ", req.file);
    try {
        const urls = [];
        // files hai tabhi loop chalao 
        if (files && files.length > 0) {
            for (let file of files) {
                const key = generateKey("product-seller", file.originalname);
                const uploadRes = await uploadObjectService({
                    key,
                    contentType: file.mimetype,
                    body: file.buffer
                });
                urls.push(uploadRes.url);
            }
        }

        // 5.pass the Product data
        const result = await createProductService(productData, urls);
        res.status(201).json({
            success: true,
            products: result,
            message: "Product Created"
        });
    } catch (error) {
        logger.error({ error }, "Error in fetching product")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
const updateProduct = async (req, res) => {
    // Yehi update karna hai abhi 
    // features
    // description
    // stock
    const data = req.body;
    try {
        const result = await updateProductService(req.params.id, data);
        res.status(200).json({
            success: true,
            products: result,
            message: "Product Updated Successfully"
        });


    } catch (error) {
        logger.error({ error }, "Error in Updating product")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

const adminUpdateProduct = async (req, res) => {

    //   category
    //   section
    //   approval status
    //   featured product
    //   visibility
    const data = req.body;
    try {
        const result = await adminUpdateProductService(req.params.id, data);
        res.status(200).json({
            success: true,
            data: result,
            message: "Product Updated Successfully"
        });


    } catch (error) {
        logger.error({ error }, "Error in Updating product")
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteProductService(id);
        res.status(200).json({
            sucess: true,
            products: result,
            message: "Product deleted Successfully"
        });


    } catch (error) {
        logger.error({ error }, "Error deleting product")
        res.status(400).json({
            sucess: false,
            message: error.message
        });

    }

}

const updateProductImage = async (req, res) => {
    const id = req.params.id;
    const files = req.files;

    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Provide at least one image"
        });
    }

    try {

        const urls = [];

        for (let file of files) {

            // `products/${Date.now()}-${file.originalname}`;
            const key = generateKey("product", file.originalname);

            const result = await uploadObjectService({
                key,
                body: file.buffer,
                contentType: file.mimetype
            });

            logger.info({ result }, "Uploaded to S3");

            // Db save ---https://cdn.com/products/123.jpg
            urls.push(result.url);
        }

        // URL pass karo
        const product = await addProductImageService(id, urls);

        res.status(200).json({
            success: true,
            products: product,
            message: "Product image added successfully"
        });

    } catch (error) {

        logger.error({ error }, "Error Updating image");

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProductImage = async (req, res) => {
    const id = req.params.id;
    const { imageUrl } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Product id required"
        });
    }
    if (!imageUrl) {
        return res.status(400).json({
            success: false,
            message: "Image url required"
        });
    }

    try {
        // 1.get key from the url 
        const key = getKeyFromUrl(imageUrl);
        // 2.Delete from Storage 
        const isDeleted = await deleteObjectService(key);
        if (!isDeleted) {
            return res.status(400).json({
                success: false,
                message: "Image not deleted || something went wrong"
            });

        }
        // 3.Delete from the Db 
        const result = await deleteProductImageService(id, imageUrl);

        res.status(200).json({
            sucess: true,
            products: result,
            message: "Product image deleted successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error deleting Images")
        res.status(400).json({
            sucess: false,
            message: error.message
        });

    }

}
module.exports = {
    getProducts,
    getProductsFilter,
    getProductsSuggestion,
    getProductById,
    getMyProducts,
    createProduct,
    updateProduct,
    adminUpdateProduct,
    deleteProduct,

    // Images 
    updateProductImage,
    deleteProductImage
}