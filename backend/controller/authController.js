const { hashPassword, comparePassword } = require("../helpers/authhelper");
const Jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JwtSecret = "Mahesh@123WebDevelopper";

// ______REGESTER_USER________
const registerController = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  switch (true) {
    case !name:
      return res.send({ message: "Name Is Required" });
    case !email:
      return res.send({ message: "Email Is Required" });
    case !password:
      return res.send({ message: "Password Is Required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.send({
        success: true,
        error: false,
        status: 200,
        message: "User Is Alredey Register",
      });
    }

    // ____HASHED_PASSWORD___
    const userHashedPassword = await hashPassword(password);
    // ____HASHED_PASSWORD___

    const user = await userModel.create({
      ...req.body,
      password: userHashedPassword,
    });

    console.log("user", user);

    if (user) {
      res.send({
        error: false,
        success: true,
        status: 200,
        user,
        message: "User Register Is Successfully",
      });
    }
  } catch (error) {
    res.send({
      error: true,
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
// ______REGESTER_USER________

// ______LOGIN_USER________

const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password) {
      return res.send({ message: "Password Is Required" });
    }
    if (!email) {
      return res.send({ message: "Email Is Required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        error: true,
        message: "Email Is Not Regester",
        success: false,
        status: 200,
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
        error: true,
        message: "Password Is Not Valid",
        success: false,
        status: 200,
      });
    }

    // ____TOKEN___

    const token = await Jwt.sign({ _id: user._id }, JwtSecret, {
      expiresIn: "5d",
    });

    if (token) {
      return res.send({
        error: false,
        message: "Login Is SuccessFully",
        success: true,
        status: 200,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
        token,
      });
    }

    // ____TOKEN_____
  } catch (error) {
    res.send({
      error: true,
      message: error.message,
      success: false,
      status: 400,
      error,
    });
  }
};

// ______LOGIN_USER________

const testController = (req, res) => {
  res.send({
    message: "Protected Routes",
  });
};

// ______USER_CONTROLLER________

const userController = (req, res) => {
  res.send({
    status: 200,
    ok: true,
  });
};

// ______USER_CONTROLLER________

// ______ADMIN_CONTROLLER________

const adminController = (req, res) => {
  res.send({
    status: 200,
    ok: true,
  });
};

// ______ADMIN_CONTROLLER________

const userAuth = (req, res) => {
  res.send({
    status: 200,
    ok: true,
  });
};

const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findById(req.user._id);
    console.log("mayank", user);
    if (password && password.length < 8) {
      return res.send({
        error: true,
        message: "Password length Minimum 6 Character",
        success: false,
        status: 400,
      });
    } else {
      const hashPass = await hashPassword(password);
      const response = await userModel.findByIdAndUpdate(req.user._id, {
        name: name || user.name,
        password: hashPass || user.password,
      });
      res.send({
        error: true,
        message: "Profile Is SuccessFUlly Update",
        success: false,
        status: 400,
        response,
      });
    }
  } catch (error) {
    res.send({
      error: true,
      message: error.message,
      success: false,
      status: 400,
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  userController,
  userAuth,
  adminController,
  updateUserProfileController,
};
