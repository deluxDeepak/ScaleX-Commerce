const router = require("express").Router();

const upload = require("../../core/upload/upload.middleware");
const authenticate = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { productSchema, updateProductSchema, productParamsSchema, } = require("./product.validator");
// const checkProductOwner = require("./product.middleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  deleteProductImage,
  updateProductImage,
  getMyProducts,
  getProductsFilter,
  getProductsSuggestion
} = require("./products.controller");


// ===== BASIC =====
// Seller 
router.get("/my", authenticate, checkRole("seller"), getMyProducts);

router.get("/", getProducts);
router.get("/filter", getProductsFilter);
router.get("/suggestion", getProductsSuggestion); //header 
router.get("/:id", getProductById);

// Product logic will be here but controller is seller 
// ===== SELLER =====
// middleare=seller 

router.post("/",
  authenticate,
  checkRole(["seller"]),
  validate(productSchema, "body"),
  upload.multipleImage,
  createProduct
);



router.patch(
  "/:id",
  authenticate,
  checkRole("seller"),
  validate(productParamsSchema, "params"),
  validate(updateProductSchema, "body"),
  // checkProductOwner,
  // images
  // features
  // description
  // stock
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  checkRole("seller"),
  validate(productParamsSchema, "params"),
  // checkProductOwner,
  deleteProduct
);






// ===== ADMIN =====
// middleware ==admin 

router.get(
  "/admin/products",
  authenticate,
  checkRole("admin"),
  () => { }
);

router.patch(
  "/admin/products/:id",
  authenticate,
  checkRole("admin"),
  () => { }
);

router.delete(
  "/admin/products/:id",
  authenticate,
  checkRole("admin"),
  () => { }
);


// ===== IMAGES =====

router.get("/products/:id/images", () => { });

router.post(
  "/:id/images",
  authenticate,
  // checkRole("seller"),
  // checkProductOwner,
  upload.multipleImage,
  updateProductImage  //indirectly update hi karenge 
);

router.delete(
  // "/products/:id/images/:imgId",
  "/:id/images",
  authenticate,
  // checkRole("seller"),
  // checkProductOwner,
  deleteProductImage
);


module.exports = router;