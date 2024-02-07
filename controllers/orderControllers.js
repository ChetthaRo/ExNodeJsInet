const ProductModel = require("../models/products.model");
const OrderModel = require("../models/orders.model");
const Users = require("../models/users.model");

exports.createOrder = async (req, res) => {
  try {
    // const products = await ProductModel.find();
    const { id } = req.params;
    const { orderNumber, quantity } = req.body;
    const productData = await ProductModel.findById(id);

    if (quantity > productData.amount) {
      return res.status(500).send({
        message: "Check amount",
        success: false,
      });
    }

    productData.amount = calculateAmount(productData.amount, quantity);
    await productData.save();

    TotalPrice = calculatePrice(quantity, productData.price);

    const newOrder = new OrderModel({
      orderNumber: orderNumber,
      totalPrice: TotalPrice,
      quantity: quantity,
      productId: productData,
    });
    const order = await newOrder.save();

    return res.status(200).send({
      data: order,
      message: "create Order success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "create Order fail",
      success: false,
    });
  }
};

exports.getOrderByProductId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        message: "Not fount Params",
        success: false,
      });
    }

    const productData = await ProductModel.findById(id);
    if (!productData) {
      return res.status(500).send({
        message: "Not fount Product",
        success: false,
      });
    }

    const orderById = await OrderModel.find({ productId: productData._id });

    return res.status(200).send({
      message: "Find orderByProductId Success",
      success: true,
      data: orderById,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Find orderById fail",
      success: false,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const Orders = await OrderModel.find();
    return res.status(200).send({
      message: "Find orders Success",
      success: true,
      data: Orders,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Order not fount",
      success: false,
    });
  }
};

function calculateAmount(q, a) {
  return q - a;
}

function calculatePrice(a, p) {
  return a * p;
}
