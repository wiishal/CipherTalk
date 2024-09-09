const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { z } = zod;
const router = express.Router();
const data = require("../mockdata.json");

console.log(data)
// signIn user hanler
router.post('/signIn',(req,res)=>{
    const {username,password} = req.body
    let document = data.find(username)
    console.log(document)
    res.send("sign in req")
})
module.exports = router;
