const { getAllCategory, createCategory, deleteCategory, updateCategoryList, getAllSUbCategoryService, getAllSubCategory, getAllSubCategoryByCategoryId, getProductByCatId, getProductByCatIDSubcategory } = require("./category.controller");
const upload = require("../../core/upload/upload.middleware")

const router = require("express").Router();

// Admin ke liye hai normally 
router.get("/sub", getAllSubCategory);
// Particular category ka subcateory 
router.get("/:id/sub", getAllSubCategoryByCategoryId);
router.get("/", getAllCategory);
router.post("/", upload.singleImage, createCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategoryList);

router.get("/:catId/product", getProductByCatId);

router.get("/:catId/sub/:subCatId/product", getProductByCatIDSubcategory);

module.exports = router;