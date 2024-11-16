const express = require("express");
const friendRouter = express.Router();
const jwt = require("jsonwebtoken");

const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const { verifyUser, getUsers, searchUser } = require("../services/userService");

friendRouter.post(
  "/search",
  tokenAuthenticationMiddleware,
  async (req, res) => {
    const query = req.body.query;

    const user = await searchUser(query);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const userFind = { username: user.username, userid: user.id };
    res.status(200).json({ userFind, msg: "success!" });
  }
);

friendRouter.post(
  "/verify",
  tokenAuthenticationMiddleware,
  async (req, res) => {
    try {
      const receivedUserid = req.body.userid;

      if (isNaN(receivedUserid)) {
        return res.status(400).json({ msg: "Invalid user ID" });
      }
      const userid = Number(receivedUserid);

      const user = await verifyUser(userid);

      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }

      const userFind = { username: user.username, userid: user.id };      return res.status(200).json({ userFind, msg: "success!" });
    } catch (error) {
      console.error("Error during verification process", error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

friendRouter.post(
  "/get-Users",
  tokenAuthenticationMiddleware,
  async (req, res) => {
    const usertoken = req.body.usertoken;
    try {
      const currentUser = jwt.verify(usertoken, process.env.jwtPassword);
      const uniqueUsers = await getUsers(currentUser);

      if (!uniqueUsers) {
        res.status(500).json({
          success: false,
          message: "Error retrieving user list",
          error: error.message,
        });
      }
      res.status(200).json({
        success: true,
        data: uniqueUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving user list",
        error: error.message,
      });
    }
  }
);
module.exports = friendRouter;
