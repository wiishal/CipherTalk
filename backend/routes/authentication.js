const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const router = express.Router();
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const creadentialCheck = require("../middleware/creadentialCheck");
const createUser = require("../services/userService");

const prisma = new PrismaClient();

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
let conversation = {};

// signIn user hanler

router.post("/login", async (req, res) => {
  console.log("req at login");
  const { userName, userPassword } = req.body;
  console.log(userName, userPassword);

  const user = await prisma.user.findFirst({
    where: {
      username: userName,
    },
  });
  console.log(user);
  if (user.username == userName) {
    console.log("username match");
    if (user.password == userPassword) {
      console.log("userpass match");
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.jwtPassword
      );
      res.status(200).json({ token, userName, msg: "User succesful login" });
      return;
    }
    res.status(401).json({ msg: "invalid password" });
    return;
  }
  res.json(401).json({ msg: "invalid Creadential" });
});

//signUp
router.post("/signUp", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const isvalid = await creadentialCheck(userName, userEmail);
  if (isvalid) {
    const id = await createUser(userName, userEmail, userPassword);
    console.log(`user Created, id : ${id}`);
    res.status(200).json({ msg: "sign up successful" });
  }
});

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
