const mongoose = require("mongoose");
const ProductModel = require("./products.model");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  quantity: { type: Number },
  totalPrice: { type: Number },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    require: true,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = OrderModel;
