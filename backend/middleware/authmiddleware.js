const Jwt = require("jsonwebtoken");
const JwtSecret = "Mahesh@123WebDevelopper";
const userModel = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(req.headers.authorization, JwtSecret);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// ____ADMIN_PROTECTED____

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    if (user.role !== "1") {
      res.send({
        error: true,
        success: false,
        message: "UnAuthorization Access",
        status: 400,
      });
    } else {
      next();
    }
  } catch (error) {
    res.send({
      error: true,
      success: false,
      message: error.message,
      status: 400,
    });
  }
};

// ____ADMIN_PROTECTED____

module.exports = { requireSignIn, isAdmin };
