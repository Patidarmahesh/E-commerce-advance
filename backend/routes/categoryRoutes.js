const express = require('express');
const {createCategoryController,updateCategoryController, getCategoryController, deleteCategoryController, getSingleCategoryController} = require('../controller/categoryController');
const { requireSignIn, isAdmin } = require('../middleware/authmiddleware');

const routes = express.Router();

// CREATE-CATEGORY || METHOD POST 
routes.post('/create-category',requireSignIn,isAdmin,createCategoryController)
// CREATE-CATEGORY || METHOD POST 

// UPDATE-CATEGORY || METHOD PUT 
routes.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)
// UPDATE-CATEGORY || METHOD PUT 

// GETALL-CATEGORY || METHOD GET 
routes.get('/get-category',getCategoryController)
// GETALL-CATEGORY || METHOD GET 

// GETSINGLE-CATEGORY || METHOD GET 
routes.get('/single-category/:slug',getSingleCategoryController)
// GETSINGLE-CATEGORY || METHOD GET 

// DELETE-CATEGORY || METHOD DELETE 
routes.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
// DELETE-CATEGORY || METHOD DELETE

module.exports = routes;