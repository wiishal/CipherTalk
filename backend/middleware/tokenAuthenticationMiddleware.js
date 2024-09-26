const express = require("express");
const jwt = require("jsonwebtoken")

function tokenAuthenticationMiddlewar(req,res,next){
    const token = req.body.usertoken;
    const username = jwt.verify(token, process.env.jwtPassword);

    if (username) {
      console.log("verify from tkam");
      next();
    } else {
      res.status(200).json({ msg: "expire token" });
    }

    
};


module.exports = tokenAuthenticationMiddlewar;