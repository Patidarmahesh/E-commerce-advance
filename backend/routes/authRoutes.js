const express = require('express');
const { registerController, loginController, testController, userAuth, userController, adminController, updateUserProfileController } = require('../controller/authController');
const { requireSignIn, isAdmin } = require('../middleware/authmiddleware');

const routes = express.Router();

// REGISTER || METHOD POST 
routes.post('/register',registerController)
// REGISTER || METHOD POST 

// LOGIN || METHOD POST 
routes.post('/login',loginController)
// LOGIN || METHOD POST 

// LOGIN || METHOD POST 
routes.get('/test',requireSignIn,isAdmin,testController)
// LOGIN || METHOD POST 

// PROTECTED || METHOD POST || USER ROUTE
routes.get('/user-auth',requireSignIn,userController)
// PROTECTED || METHOD POST || USER ROUTE

// PROTECTED || METHOD POST || ADMIN ROUTE 
routes.get('/admin-auth',requireSignIn,isAdmin,adminController)
// PROTECTED || METHOD POST || ADMIN ROUTE

routes.put('/profile',requireSignIn,updateUserProfileController);

module.exports = routes;