const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { verifyToken, decode } = require("../middleware/jwt_decode");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password, email, role, status } = req.body;
    console.log("req.body :", req.body);
    const OldUser = await User.findOne({ username, email });
    if (OldUser) {
      return res.send({
        message: "User Already Exists !",
        success: false,
      });
    }
    console.log("on hashPaas");
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("pass hashPaas");
    const newUser = new User({
      username,
      password: hashPassword,
      email,
      role,
      status,
    });
    const user = newUser.save();
    return res.status(200).send({
      data: { _id: user._id, username, email, role, status },
      message: "create",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "create  fail",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    //1. Check User
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    console.log("user :", user);
    if (!user) {
      return res.status(400).send({
        message: "login fail",
        success: false,
      });
    }
    if (!user.status !== false) {
      return res.status(400).send({
        message: "Please contact admin.",
        success: false,
      });
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      console.log("!checkPassword");
      return res.status(500).send({
        message: "login fail",
        success: true,
      });
    }
    const { email, _id, status, role } = user;
    const token = jwt.sign(
      { _id, email, status, role },
      process.env.DB_JWT_TOKEN_KEY,
      {
        expiresIn: "100d",
      }
    );
    return res.status(200).send({
      data: { _id, username, email, token },
      message: "login success",
      success: true,
    });
  } catch (error) {}
};
exports.approved = async (req, res) => {
  try {
    const userAdmin = await User.findById(req.user._id);

    if (!userAdmin) {
      return res.status(400).send({
        message: "Not found",
        success: false,
      });
    }

    if (userAdmin.role === "admin") {
      const userId = await User.findById(req.params.id);
      if (userId.status === false) {
        userId.status = req.body.status;
        userId.save();
        return res.status(200).send({
          message: "Success Status true",
          success: true,
        });
      } else {
        return res.status(400).send({
          message: "Status is true",
          success: false,
        });
      }
    } else {
      return res.status(400).send({
        message: "คุณบ่มีสิทธิ์",
        success: false,
      });
    }
  } catch (error) {}
};

exports.getuser = async (req, res) => {
  try {
    const users = await User.find();

    // if (products === undefined) {
    //   return res.status(500).send({
    //     message: "not fount product",
    //     success: false,
    //   });
    // }

    return res.status(200).send({
      message: "success",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      message: "fail",
      success: false,
    });
  }
};

exports.updateToUser = async (req, res) => {
  console.log("updateToUser :");
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    console.log("id :", id);
    console.log("req.body :", req.body);

    let UserUpdate = await User.findByIdAndUpdate(
      id,
      {
        username: username,
        email: email,
        role: role,
      },
      { new: true }
    );

    return res.status(200).send({
      data: UserUpdate,
      message: "Update User success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Update User fail",
      success: false,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await User  .findByIdAndDelete(id);

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
