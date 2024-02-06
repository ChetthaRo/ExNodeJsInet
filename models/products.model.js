const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname: { type: String, },
    amount: { type: Number, },
    price: { type: Number },
    status: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
