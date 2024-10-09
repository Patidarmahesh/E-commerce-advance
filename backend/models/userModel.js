const mongoose = require("mongoose");

const authUserSchima = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", authUserSchima);

module.exports = userModel;
