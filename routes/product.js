var express = require("express");
var router = express.Router();
// const jwt = require("jsonwebtoken");
// const tokenMiddleware = require("../middleware/checkToken");
const { getallProduct, createProduct } = require("../controllers/productControllers");
const { verifyToken } = require("../middleware/jwt_decode");

router.get("/product", getallProduct);
router.post("/create/product", verifyToken, createProduct);
// router.post("/approved/:id", verifyToken, approved);

module.exports = router;
