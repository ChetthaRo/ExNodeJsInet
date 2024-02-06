const ProductModel = require("../models/products.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getallProduct = async (req, res) => {
    try {
        res.render('index', { title: 'Express' });
    } catch (error) {
        return res.status(500).send({
            message: "create  fail",
            success: false,
        });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { productname, price, amount, status } = req.body
        const newProduct = new ProductModel({
            productname: productname,
            price: price,
            amount: amount,
            status: status
        })
        const product = await newProduct.save();
        return res.status(200).send({
            data: product,
            message: "create success",
            success: true
        })
    } catch (error) {
        return res.status(500).send({
            message: "create  fail",
            success: false,
        });
    }
};
