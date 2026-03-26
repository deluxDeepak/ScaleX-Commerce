const Category = require("./category.model")

const findAllcategory = async () => {
    return await Category.find().lean();
}
const findcategoryById = async (catId) => {
    return await Category.findById(catId).lean();
}
const findAllSubcategory = async () => {
    return await Category.find().select("subCategories").lean();
}
const findAllSubcategoryByCatId = async (categoryId) => {
    return Category
        .findById(categoryId)
        .select("subCategories -_id")
        .lean();

}

const createCategory = async (data) => {
    return await Category.create(data);
}
const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
}
const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });



}

module.exports = {
    findAllcategory,
    findcategoryById,
    findAllSubcategory,
    findAllSubcategoryByCatId,
    createCategory,
    deleteCategory,
    updateCategory,

}