const fs = require("fs");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const braintree = require("braintree");
const orderModel = require("../models/orderModel");
require('dotenv').config()

// ______PAYMENTGETWAY_CONTROLLER________||
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY ,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
// ______PAYMENTGETWAY_CONTROLLER________||

// ______CREATEPRODUCT_CONTROLLER________||
const createProductController = async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.send({ message: "Name Is Required" });
      case !description:
        return res.send({ message: "Description Is Required" });
      case !price:
        return res.send({ message: "Price Is Required" });
      case !category:
        return res.send({ message: "Category Is Required" });
      case !quantity:
        return res.send({ message: "Quantity Is Required" });
      case !photo && photo.size > 1000000:
        return res.send({ message: "Photo Is Required Is Less Then 1 Mb" });
    }
    const response = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      response.photo.data = fs.readFileSync(photo.path);
      response.photo.contentType = photo.type;
    }
    await productModel.create(response);
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Add Product Successfully",
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
// ______CREATEPRODUCT_CONTROLLER________||

// ______GETPRODUCT_CONTROLLER________||
const getProductController = async (req, res) => {
  try {
    const response = await productModel
      .find({})
      .populate("category")
      .select("-photo");
    // .limit(12);
    if (response) {
      res.send({
        status: 200,
        totelCount: response.length,
        error: false,
        success: true,
        message: "Get All Product",
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
// ______GETPRODUCT_CONTROLLER________||

// ______GETSINGLEPRODUCT_CONTROLLER________||
const getSingleProductController = async (req, res) => {
  try {
    const response = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Single Product",
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
// ______GETSINGLEPRODUCT_CONTROLLER________||

// ______GETPHOTOPRODUCT_CONTROLLER________||
const getProductPhotoController = async (req, res) => {
  try {
    const response = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (response.photo.data) {
      res.set({ "content-Type": response.photo.contentType });
      return res.send(response.photo.data);
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
// ______GETPHOTOPRODUCT_CONTROLLER________||

// ______DELETEPRODUCT_CONTROLLER________||
const deleteProductController = async (req, res) => {
  try {
    const response = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Delete Product Successfull",
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
// ______DELETEPRODUCT_CONTROLLER________||

// ______UPDATEPRODUCT_CONTROLLER________||
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    const { pid } = req.params;
    switch (true) {
      case !name:
        return res.send({ message: "Name Is Required" });
      case !description:
        return res.send({ message: "Description Is Required" });
      case !price:
        return res.send({ message: "Price Is Required" });
      case !category:
        return res.send({ message: "Category Is Required" });
      case !quantity:
        return res.send({ message: "Quantity Is Required" });
      case !photo && photo.size > 1000000:
        return res.send({ message: "Photo Is Required Is Less Then 1 Mb" });
    }
    const response = await productModel.findByIdAndUpdate(
      pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      response.photo.data = fs.readFileSync(photo.path);
      response.photo.contentType = photo.type;
    }
    await response.save();
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Update Product Successfully",
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
// ______UPDATEPRODUCT_CONTROLLER________||

// ______FILTERPRODUCT_CONTROLLER________||
const filterProduct = async (req, res) => {
  try {
    const { Checked, radio } = req.body;
    let product = {};
    if (Checked.length > 0) {
      product.category = Checked;
    }
    if (radio.length) {
      product.price = { $gte: radio[0], $lte: radio[1] };
    }
    const response = await productModel.find(product);
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Filter Data Successfully",
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
// ______FILTERPRODUCT_CONTROLLER________||

// ______PRODUCTCOUNT_CONTROLLER________||
const productCountController = async (req, res) => {
  try {
    const response = await productModel.find({}).estimatedDocumentCount();
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Count Value Successfully",
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
// ______PRODUCTCOUNT_CONTROLLER________||

// ______PRODUCTPAGE_CONTROLLER________||
const productPageController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const response = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Count Value Successfully",
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
// ______PRODUCTPAGE_CONTROLLER________||

// ______SIMELARPRODUCT_CONTROLLER________||
const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const response = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(4)
      .populate("category");
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Count Value Successfully",
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

// ______SIMELARPRODUCT_CONTROLLER________||

// ______SEARCHPRODUCT_CONTROLLER________||

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const response = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Search Value Successfully",
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

// ______SEARCHPRODUCT_CONTROLLER________||

// ______CATEGORIESPRODUCT_CONTROLLER________||

const categoriesProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    const response = await productModel.find({ category }).populate("category");
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "Get Categories Value Successfully",
        response: { category, response },
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

// ______CATEGORIESPRODUCT_CONTROLLER________||

// Token;
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.send({
          status: 400,
          error: false,
          success: true,
          message: error,
        });
      } else {
        res.send({
          status: 200,
          error: false,
          success: true,
          message: "Get Payment Getway Token Successfully",
          response,
        });
      }
    });
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};
// Token

// Payment
const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let totel = 0;
    cart.map((i) => {
      totel += i.price;
    });
    let newTransition = gateway.transaction.sale(
      {
        amount: totel,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.send({
            ok: true,
          });
        } else {
          res.send({
            status: 400,
            error: false,
            success: true,
            message: error,
          });
        }
      }
    );
  } catch (error) {
    res.send({
      status: 400,
      error: true,
      success: false,
      message: error.message,
    });
  }
};
// Payment

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  getProductPhotoController,
  deleteProductController,
  updateProductController,
  filterProduct,
  productCountController,
  productPageController,
  similarProductController,
  searchProductController,
  categoriesProductController,
  braintreeTokenController,
  braintreePaymentController,
};
