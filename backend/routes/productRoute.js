const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview,getAdminProducts,getSellerProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles,authorizeSellerRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
router.route("/product/:id").get(getProductDetails);

// Seller Routes
router.route("/seller/products").get(isAuthenticatedUser, authorizeSellerRoles("seller"), getSellerProducts);
router.route("/seller/product/new").post(isAuthenticatedUser,authorizeSellerRoles("seller"),createProduct);
router.route("/seller/product/:id").put(isAuthenticatedUser,authorizeSellerRoles("seller"),updateProduct).delete(isAuthenticatedUser,authorizeSellerRoles("seller"),deleteProduct).get(getProductDetails);


module.exports = router