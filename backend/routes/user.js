const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

//Middleware
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const creadentialTypeCheck = require("../middleware/typeCheck/creadentialTypeCheck")
const creadentialCheck = require("../middleware/creadentialCheck");
const createUser = require("../services/userService");



// login user handler
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
    if (user.password == userPassword) {
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.jwtPassword
      );
      res.status(200).json({ token, msg: "User succesful login" });
      return;
    }
    res.status(401).json({ msg: "invalid password" });
    return;
  }
  res.json(401).json({ msg: "invalid Creadential" });
});




//signUp user handler
router.post("/signUp",creadentialTypeCheck, async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  const isvalid = await creadentialCheck(userName, userEmail);
  if (isvalid) {
    const id = await createUser(userName, userEmail, userPassword);
    console.log(`user Created, id : ${id}`);
    res.status(200).json({ msg: "sign up successful" });
  }
});

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
