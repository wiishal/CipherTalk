const express = require("express");
const encryptRouter = express.Router();

const encryptionController = require("../controller/encryption.controller")
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");

encryptRouter.use("/*", tokenAuthenticationMiddleware);

encryptRouter.post("/verifyKetStatus", encryptionController.verifyKeyStatus);

encryptRouter.post("/setKeystatus", encryptionController.setKeyStatus);

module.exports = encryptRouter;
