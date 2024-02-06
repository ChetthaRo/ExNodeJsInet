const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decode = jwt.verify(token, process.env.DB_JWT_TOKEN_KEY);
    req.user = decode;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
