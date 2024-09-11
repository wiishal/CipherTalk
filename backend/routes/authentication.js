const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { z } = zod;
const router = express.Router();
const data = require("../mockdata.json");
require("dotenv").config();

console.log(data);
// signIn user hanler
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userDoc = data.filter((e) => {
    return e.userName == username;
  });
  if (userDoc)
    if (userDoc.password == password) {
      let token = jwt.sign({ user: userDoc.userName }, process.env.jwtPassword);
      res.json({ token: token, msg: "user logged" });
    }
});
module.exports = router;
