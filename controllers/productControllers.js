const ProductModel = require("../models/products.model");
const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.allproduct = async (req, res) => {
  try {
    const products = await ProductModel.find();

    // if (products === undefined) {
    //   return res.status(500).send({
    //     message: "not fount product",
    //     success: false,
    //   });
    // }

    return res.status(200).send({
      message: "success",
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).send({
      message: "fail",
      success: false,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await ProductModel.findById(id);

    return res.status(200).send({
      message: "success",
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).send({
      message: "fail",
      success: false,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const userAdmin = await Users.findById(req.user._id);
    console.log(userAdmin.role);
    if (!userAdmin) {
      return res.status(400).send({
        message: "Not found",
        success: false,
      });
    }

    if (userAdmin.role !== "admin") {
      return res.status(400).send({
        message: "You do not have permission to create products!",
        success: false,
      });
    }

    const { nameproduct, price, amount, status } = req.body;
    const newProduct = new ProductModel({
      nameproduct: nameproduct,
      price: price,
      amount: amount,
      status: status,
    });
    const product = await newProduct.save();
    return res.status(200).send({
      data: product,
      message: "create Product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "create Product fail",
      success: false,
    });
  }
};

exports.updateToProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameproduct, amount, status, price } = req.body;
    const userAdmin = await Users.findById(req.user._id);

    if (!userAdmin) {
      return res.status(400).send({
        message: "Not found",
        success: false,
      });
    }

    if (userAdmin.role !== "admin") {
      return res.status(400).send({
        message: "You do not have permission to create products!",
        success: false,
      });
    }

    if (!id) {
      return res.status(500).send({
        message: "Id Invalid",
        success: false,
      });
    }
    let product = await ProductModel.findByIdAndUpdate(
      id,
      {
        nameproduct: nameproduct,
        amount: amount,
        price: price,
        status: status,
      },
      { new: true }
    );

    return res.status(200).send({
      data: product,
      message: "Update Product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Update Product fail",
      success: false,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const userAdmin = await Users.findById(req.user._id);
    if (!id) {
      return res.status(400).send({
        message: "Id Invalid",
        success: false,
      });
    }

    if (userAdmin.role !== "admin") {
      return res.status(400).send({
        message: "You do not have permission to create products!",
        success: false,
      });
    }

    await ProductModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Delete Product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Delete Product fail",
      success: false,
    });
  }
};
