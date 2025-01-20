const express = require("express");
const friendRouter = express.Router();

const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
const friendController = require("../controller/friend.controller");

friendRouter.use("/*", tokenAuthenticationMiddleware);

friendRouter.post("/search", friendController.search);

friendRouter.post("/verify", friendController.verifyFriend);

friendRouter.post("/get-Users", friendController.getUser);

module.exports = friendRouter;
