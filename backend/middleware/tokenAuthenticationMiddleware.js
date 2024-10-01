const express = require("express");
const jwt = require("jsonwebtoken");

function tokenAuthenticationMiddleware(req, res, next) {

  const token = req.body.usertoken;
  let username;
  try {
    username = jwt.verify(token, process.env.jwtPassword);
  } catch (error) {
    console.log("invalid token")
  }

  if (username) {
    next();
  } else {
    res.status(200).json({ msg: "expire token" });
  }
}

module.exports = tokenAuthenticationMiddleware;
