const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: [true, "Please provide password"] },
  email: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: Boolean, default: false },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
