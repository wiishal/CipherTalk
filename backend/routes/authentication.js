const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const http = require('http')
const {server} = require("socket.io")
const zod = require("zod");
const { z } = zod;
const router = express.Router();
const data = [
  {
    userName: "vishal",
    email: "vishal@gmail.com",
    password: "vishal123",
    socketId:null,
  },
  {
    userName: "vish",
    email: "vish@gmail.com",
    password: "vish123",
    socketId:null,
  },
];
require("dotenv").config();
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");

console.log(data);
// signIn user hanler
router.post("/login", (req, res) => {
  console.log("req at login");
  const { userName, userPassword } = req.body;
  console.log(userName, userPassword);
  const userDoc = data.find((e) => {return e.userName == userName});
  console.log(userDoc)
  if (!userDoc) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (userDoc.password === userPassword) {
    console.log(userDoc);
    let token = jwt.sign({ user: userDoc.userName }, process.env.jwtPassword, {
      expiresIn: "1h", // optional: add token expiration
    });
    return res.json({ token: token, msg: "User logged in" });
  } else {
    return res.status(401).json({ msg: "Incorrect password" });
  }
});

router.post("/verifyToken", tokenAuthenticationMiddleware, (req, res) => {
  const token = req.body.usertoken;
  const user = jwt.verify(token, process.env.jwtPassword);

  if (user) {
    console.log(user)
    res.json({ UserToken: user });
  }else{
    res.json({msg:"invalid token"})
  }
});

module.exports = router;
