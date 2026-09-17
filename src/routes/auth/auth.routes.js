const express = require("express");
const route = express.Router();
const authController = require("../../controllers/auth/auth.controller");

route.post("/requester", authController.registerController);
route.patch("/requester", authController.verifyEmailByOtpController);

module.exports = route;