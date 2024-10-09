const mongoose = require("mongoose");

const orderSchima = new mongoose.Schema(
  {
    products: [
      {
        type:  mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type:  mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processs", "Shipped", "Deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchima);

module.exports = orderModel;
