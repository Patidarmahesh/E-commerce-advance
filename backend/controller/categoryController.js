const categoryModel = require("../models/categoryModel");
var slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.send({ message: "Name Is Required" });
    }
    const response = await categoryModel.findOne({ name });
    if (response) {
      return res.send({
        error: true,
        success: false,
        status: 400,
        message: "Category Is Already Exist",
      });
    }
    const responseCategory = await categoryModel.create({
      ...req.body,
      slug: slugify(name),
    });
    if (responseCategory) {
      return res.send({
        error: false,
        success: true,
        status: 200,
        responseCategory,
        message: "Category Is Added",
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      success: false,
      error: true,
      error: error.message,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const response = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Category Is Update",
        response,
      });
    } else {
      res.send({
        status: 400,
        error: true,
        success: false,
        response,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const response = await categoryModel.find({});
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "get all category",
        response,
      });
    } else {
      res.send({
        status: 400,
        error: true,
        success: false,
        response,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await categoryModel.findByIdAndDelete(id);
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "delete category",
        response,
      });
    } else {
      res.send({
        status: 400,
        error: true,
        success: false,
        response,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params.slug;
    const response = await categoryModel.findOne(slug);
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "get single category",
        response,
      });
    } else {
      res.send({
        status: 400,
        error: true,
        success: false,
        response,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
};
