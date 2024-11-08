const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const router = express.Router();

//Middleware
const creadentialTypeCheck = require("../middleware/typeCheck/creadentialTypeCheck");
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const creadentialCheck = require("../middleware/creadentialCheck");
const logincreadentialTypeCheck = require("../middleware/typeCheck/loginCredentialTypeCheck");
//services
const { createUser, getUser } = require("../services/userService");

// login user handler
router.post("/login", logincreadentialTypeCheck, async (req, res) => {
  console.log("req at login");
  const { userName, userPassword } = req.body;
  console.log(userName, userPassword);

  try {
    const user = await getUser(userName);
    if (!user) {
      res.json(401).json({ msg: "invalid Creadential" });
      return;
    }
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
  } catch (error) {
    console.log("Error while Login User", error);
  }
});

//signUp user handler
router.post("/signUp", creadentialTypeCheck, async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const isvalid = await creadentialCheck(userName, userEmail);

  if (isvalid) {
    const user = await createUser(userName, userEmail, userPassword);
    console.log(`user Created, id : ${user.id}`);
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.jwtPassword
    );
    res.status(200).json({ token, msg: "sign up successful" });
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
