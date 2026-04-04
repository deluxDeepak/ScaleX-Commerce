const logger = require("../../core/logger/logger");
const { uploadObjectService } = require("../../core/storage/storage.services");
const { generateKey } = require("../../shared/utils/genKeys.utils");
const { getAllCategoryService, createCategoryService, deleteCategoryService, updateCategoryService, getAllSUbCategoryService, getAllSubCategoryByCategoryIdService, getProductByCatIdService, getProductBySubCatIdService } = require("./category.service");

const getAllCategory = async (req, res) => {
    try {
        const category = await getAllCategoryService();

        res.status(200).json({
            success: true,
            category: category,
            message: "Category feteched successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching category")
        res.status(404).json({
            success: false,
            message: error.message || "Error in fetching category"
        });


    }
}
const getProductByCatId = async (req, res) => {
    try {
        const catId = req.params.catId
        const product = await getProductByCatIdService(catId);
        console.log("Category", product);

        res.status(200).json({
            success: true,
            products: product,
            message: "Category product fetched successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching Product by category")
        res.status(404).json({
            success: false,
            message: error.message || "Error in fetching Product by category"
        });


    }
}
const getProductByCatIDSubcategory = async (req, res) => {
    try {
        console.log("Req params", req.params);
        const catId = req.params.catId;
        const subCatId = req.params.subCatId;
        console.log("Product id is ", subCatId);
        const product = await getProductBySubCatIdService(catId, subCatId);

        console.log("Category", product);

        res.status(200).json({
            success: true,
            products: product,
            message: "Category product fetched successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching Product by category")
        res.status(404).json({
            success: false,
            message: error.message || "Error in fetching Product by category"
        });


    }
}
const getAllSubCategory = async (req, res) => {
    try {
        const subCategory = await getAllSUbCategoryService();

        res.status(200).json({
            success: true,
            subCategory: subCategory,
            message: "Category feteched successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching subCategory")
        res.status(404).json({
            success: false,
            message: error.message || "Error in fetching subCategory"
        });


    }
}
const getAllSubCategoryByCategoryId = async (req, res) => {
    const categoryId = req.params.id;

    try {
        console.log("Enter in geall");
        const subCategory = await getAllSubCategoryByCategoryIdService(categoryId);
        console.log("Category", subCategory);

        res.status(200).json({
            success: true,
            subCategory: subCategory,
            message: "Category feteched successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in fetching subCategory")
        res.status(404).json({
            success: false,
            message: error.message || "Error in fetching subCategory"
        });


    }
}


const createCategory = async (req, res) => {
    const data = req.body;
    const file = req.file
    try {
        // Upload file as icon in category 
        const key = generateKey("icons", file.originalname);
        console.log("Original key is ", key);
        const uploadres = await uploadObjectService({
            key,
            body: file.buffer,
            contentType: file.mimetype,
        })
        const iconData = {
            ...data,
            icon: uploadres.url
        }
        const category = await createCategoryService(iconData);

        res.status(200).json({
            success: true,
            category: category,
            message: "Category created successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in fetching category")
        res.status(400).json({
            success: false,
            message: error.message || "Error in creating category"
        });

    }


}
const deleteCategory = async (req, res) => {
    const catId = req.params.id;
    try {
        const category = await deleteCategoryService(catId);
        res.status(200).json({
            success: true,
            category: category,
            message: "Category deleted successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in deletion of category")
        res.status(400).json({
            success: false,
            message: error.message || "Error in deletion category"
        });

    }
}
const updateCategoryList = async (req, res) => {
    const catId = req.params.id;
    const data = req.body
    try {
        const category = await updateCategoryService(catId, data);
        res.status(200).json({
            success: true,
            category: category,
            message: "Category updated successfully"
        });

    } catch (error) {
        logger.error({ error }, "Error in updation of category")
        res.status(400).json({
            success: false,
            message: error.message || "Error in updation category"
        });

    }

}

module.exports = {
    getAllCategory,
    getAllSubCategory,
    getProductByCatId,
    getProductByCatIDSubcategory,
    getAllSubCategoryByCategoryId,
    createCategory,
    deleteCategory,
    updateCategoryList
}