const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middleware/authmiddleware');
const {createProductController,getProductController, getSingleProductController, getProductPhotoController, updateProductController, deleteProductController, filterProduct, productCountController, productPageController, similarProductController, searchProductController, categoriesProductController, braintreeTokenController, braintreePaymentController} = require('../controller/productController');

const routes = express.Router();

// CREATE-PRODUCT || METHOD POST 
routes.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
// CREATE-PRODUCT || METHOD POST 

//  GETALL-PRODUCT || METHOD GET 
routes.get('/get-product',getProductController)
// GETALL-PRODUCT || METHOD GET 


//  GETSINGLE-PRODUCT || METHOD GET 
routes.get('/single-product/:slug',getSingleProductController)
// GETSINGLE-PRODUCT || METHOD GET 

//  GETPHOTO-PRODUCT || METHOD GET 
routes.get('/product-photo/:pid',getProductPhotoController)
// GETPHOTO-PRODUCT || METHOD GET 

//  UPDATEPHOTO-PRODUCT || METHOD PUT 
routes.put('/product-update/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
// UPDATEPHOTO-PRODUCT || METHOD PUT 

//  UPDATEPHOTO-PRODUCT || METHOD PUT 
routes.delete('/product-delete/:pid',requireSignIn,isAdmin,deleteProductController)
// UPDATEPHOTO-PRODUCT || METHOD PUT

//  FILTER-PRODUCT || METHOD POST 
routes.post('/filter-product',filterProduct)
// FILTER-PRODUCT || METHOD POST

//  COUNT-PRODUCT || METHOD GET 
routes.get('/count-product',productCountController)
// COUNT-PRODUCT || METHOD GET

//  COUNT-PRODUCT || METHOD GET 
routes.get('/product-list/:page',productPageController)
// COUNT-PRODUCT || METHOD GET

//  SIMILAR-PRODUCT || METHOD GET 
routes.get('/similar-product/:pid/:cid',similarProductController)
// SIMILAR-PRODUCT || METHOD GET

//  SEARCH-PRODUCT || METHOD GET 
routes.get('/search/:keyword',searchProductController)
// SEARCH-PRODUCT || METHOD GET

//  CATEGORIES-PRODUCT || METHOD GET 
routes.get('/product-categories/:slug',categoriesProductController)
// CATEGORIES-PRODUCT || METHOD GET

// //  PAYMENT-GETWAY || METHOD GET || TOKEN
routes.get('/braintree/token',braintreeTokenController)
// // PAYMENT-GETWAY || METHOD GET || TOKEN

routes.post('/braintree/payment',requireSignIn,braintreePaymentController)


module.exports = routes;