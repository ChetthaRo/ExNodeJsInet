var express = require("express");
var router = express.Router();
const {
  createOrder,
  getOrderByProductId,
  getOrders,
} = require("../controllers/orderControllers");
const { verifyToken } = require("../middleware/jwt_decode");

router.post("/product/:id/order", verifyToken, createOrder);
router.get("/product/:id/orders", verifyToken, getOrderByProductId);
router.get("/orders", verifyToken, getOrders);

module.exports = router;
