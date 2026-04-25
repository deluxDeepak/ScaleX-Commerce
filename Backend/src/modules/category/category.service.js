const { default: mongoose } = require("mongoose");
const { DatabaseError, NotfoundError, ValidationError } = require("../../shared/errors");
const { findAllcategory, createCategory, deleteCategory, updateCategory, findAllSubcategory, findAllSubcategoryByCatId, findcategoryById } = require("./category.repository");
const generateSlug = require("../../shared/utils/genSlug");
const { findProductByCategoryId, findProductBySubCategoryId } = require("../products/product.repository");

const getAllCategoryService = async () => {
    const category = await findAllcategory();
    if (!Array.isArray(category) || category.length === 0) {
        return [];
    }
    return category;

}
const getProductByCatIdService = async (catId) => {
    if (!catId) {
        throw new ValidationError("Cat id is not provided");
    }
    // cat exist or not 
    const isCatexist = await findcategoryById(catId);
    if (!isCatexist) {
        throw new NotfoundError("Category not found ");
    }

    // 2.Find Category products 
    const products = await findProductByCategoryId(catId);
    if (!Array.isArray(products) || products.length === 0) {
        return [];
    }
    return products;

}
const getProductBySubCatIdService = async (catId, subId) => {
    if (!catId || !subId) {
        throw new ValidationError("Category and subcategory ids are required");
    }

    if (!mongoose.Types.ObjectId.isValid(catId) || !mongoose.Types.ObjectId.isValid(subId)) {
        throw new ValidationError("Category and subcategory must be Object ids");
    }

    const category = await findcategoryById(catId);
    if (!category) {
        throw new NotfoundError("Category not found");
    }

    const subExists = Array.isArray(category.subCategories)
        && category.subCategories.some((sub) => String(sub._id) === String(subId));
    if (!subExists) {
        throw new NotfoundError("Subcategory not found");
    }

    const products = await findProductBySubCategoryId(subId);
    if (!Array.isArray(products) || products.length === 0) {
        return [];
    }
    return products;

}
const getAllSUbCategoryService = async () => {
    const category = await findAllSubcategory();
    if (!Array.isArray(category) || category.length === 0) {
        return [];
    }
    return category;

}
const getAllSubCategoryByCategoryIdService = async (categoryId) => {

    // if(mongoose)
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new ValidationError("Category must be an Object id ");
    }
    const subcategory = await findAllSubcategoryByCatId(categoryId);
    console.log("Subcategory are ",subcategory);
    
    if (!Array.isArray(subcategory) || subcategory.length === 0) {
        return [];
    }
    return subcategory;

}

const createCategoryService = async (data) => {

    if (!data.name) {
        throw new ValidationError("Name is not provided ");

    }
    // 2.Generate the slug for better serach in a database 
    const slug = generateSlug(data.name);

    // Subcategory with slug 
    const formatedSlug = data.subCategories?.map((sub) => ({
        name: sub.name,
        slug: generateSlug(sub.name)
    }))


    const slugData = {
        ...data,
        slug: slug,
        subCategories: formatedSlug
    }
    const category = await createCategory(slugData);
    if (!category) {
        throw new DatabaseError("Category not created");
    }

    return category;

}
const deleteCategoryService = async (catId) => {
    if (!catId) {
        throw new ValidationError("Category is reuired");
    }
    const category = await deleteCategory(catId);
    if (!category) {
        throw new NotfoundError("Category not exist or delted");
    }

    return category;

}
const updateCategoryService = async (catId, data) => {
    if (!catId || !data) {
        throw new ValidationError("Category is reuired");
    }
    const category = await updateCategory(catId, data);
    if (!category) {
        throw new NotfoundError("Category not found or delted")
    }
    return category;

}

module.exports = {
    getAllCategoryService,
    getAllSUbCategoryService,
    getProductByCatIdService,
    getProductBySubCatIdService,
    getAllSubCategoryByCategoryIdService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,

}