var express = require("express");
var router = express.Router();
// const jwt = require("jsonwebtoken");
// const tokenMiddleware = require("../middleware/checkToken");
const {
  allproduct,
  createProduct,
  updateToProduct,
  deleteProductById,
  getProductById,
} = require("../controllers/productControllers");
const { verifyToken } = require("../middleware/jwt_decode");

router.get("/product", verifyToken, allproduct);
router.get("/product/:id", verifyToken, getProductById);
router.post("/create/product", verifyToken, createProduct);
router.put("/update/product/:id", verifyToken, updateToProduct);
router.delete("/delete/product/:id", verifyToken, deleteProductById);

module.exports = router;
