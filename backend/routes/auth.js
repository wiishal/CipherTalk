const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

//Middleware
const creadentialTypeCheck = require("../middleware/typeCheck/creadentialTypeCheck");
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const creadentialCheck = require("../middleware/creadentialCheck");
const logincreadentialTypeCheck = require("../middleware/typeCheck/loginCredentialTypeCheck");
//services
const { createUser, getUser } = require("../services/userService");

const userController = require("../controller/user.controller");

// login user handler
router.post("/login", logincreadentialTypeCheck, userController.login);

//signUp user handler
router.post("/signUp", creadentialTypeCheck, userController.signUp);

//Token Verification
router.post("/verifyToken", tokenAuthenticationMiddleware, (req, res) => {
  const token = req.body.usertoken;
  const username = jwt.verify(token, process.env.jwtPassword);
  if (username) {
    console.log(username);
    res.json({ UserToken: username });
  } else {
    res.json({ msg: "invalid token" });
  }
});

module.exports = router;
