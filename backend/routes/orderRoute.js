const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder,getAllSellerOrders } = require('../controllers/orderController');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles,authorizeSellerRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/orders/all").get(isAuthenticatedUser,authorizeRoles("admin"));
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

// Seller Routes
router.route("/seller/orders").get(isAuthenticatedUser,authorizeSellerRoles("seller"),getAllSellerOrders);
router.route("/seller/order/:id").put(isAuthenticatedUser,authorizeSellerRoles("seller"),updateOrder).delete(isAuthenticatedUser,authorizeSellerRoles("seller"),deleteOrder);

module.exports = router;

