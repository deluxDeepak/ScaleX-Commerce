const router = require("express").Router();

const upload = require("../../core/upload/upload.middleware");
const authenticate = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const checkProductOwner = require("./product.middleware");

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

router.get("/", getProducts);
router.get("/filter", getProductsFilter);
router.get("/suggestion", getProductsSuggestion); //header 
router.get("/:id", getProductById);


// ===== SELLER =====
// middleare=seller 

router.post("/",
  authenticate, checkRole(["seller"]), upload.multipleImage, createProduct
);


router.patch(
  "/:id",
  authenticate,
  checkRole("seller"),
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
  // checkProductOwner,
  deleteProduct
);

router.get("/my", authenticate, checkRole("seller"), getMyProducts);




// ===== ADMIN =====
// middleware ==admin 

router.get(
  "/admin/products",
  authenticate,
  checkRole("admin"),
  (req, res) => { }
);

router.patch(
  "/admin/products/:id",
  authenticate,
  checkRole("admin"),
  (req, res) => { }
);

router.delete(
  "/admin/products/:id",
  authenticate,
  checkRole("admin"),
  (req, res) => { }
);


// ===== IMAGES =====

router.get("/products/:id/images", (req, res) => { });

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