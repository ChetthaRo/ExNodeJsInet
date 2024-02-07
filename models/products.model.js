const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nameproduct: { type: String, require: true },
  amount: { type: Number, require: true },
  price: { type: Number, require: true },
  status: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
