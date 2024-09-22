const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const zod = require("zod");
const router = express.Router();
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");

const data = [
  {
    userName: "vishal",
    uid: 1,
    email: "vishal@gmail.com",
    password: "vishal123",
    socketId: null,
  },
  {
    userName: "vish",
    uid: 2,
    email: "vish@gmail.com",
    password: "vish123",
    socketId: null,
  },
];

console.log(data);
// signIn user hanler
router.post("/login", (req, res) => {
  console.log("req at login");
  const { userName, userPassword } = req.body;
  console.log(userName, userPassword);

  const userDoc = data.find((e) => {return e.userName == userName});
  console.log(userDoc)

  if (!userDoc) {
    console.log("user not found")
    return res.status(404).json({ msg: "User not found" });
  }

  if (userDoc.password === userPassword) {
    console.log(userDoc);
    let token = jwt.sign({ user: userDoc.userName }, process.env.jwtPassword, {
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
