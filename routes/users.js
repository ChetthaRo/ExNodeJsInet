var express = require("express");
var router = express.Router();
// const jwt = require("jsonwebtoken");
// const tokenMiddleware = require("../middleware/checkToken");
const {
  register,
  login,
  approved,
  getuser,
  updateToUser,
  deleteUserById,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/jwt_decode");

router.post("/register", register);
router.post("/login", login);
router.post("/approved/:id", verifyToken, approved);
router.get("/users", getuser);
router.put("/update/:id", updateToUser);
router.delete("/delete/:id", deleteUserById);

module.exports = router;
