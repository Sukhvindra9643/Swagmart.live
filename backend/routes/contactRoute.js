const express = require("express");
const {createQuery,getAllQueries,deleteQuery} = require("../controllers/contactController");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/query/new").post(isAuthenticatedUser,createQuery);
router.route("/admin/queries").get(isAuthenticatedUser,authorizeRoles("admin"),getAllQueries)
router.route("/admin/delete/query/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteQuery)

module.exports = router