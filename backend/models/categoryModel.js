const mongoose = require("mongoose");

const categorySchima = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

const categoryModel = mongoose.model("Category", categorySchima);

module.exports = categoryModel;
