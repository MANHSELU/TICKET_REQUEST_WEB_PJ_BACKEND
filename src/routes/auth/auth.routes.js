const express = require("express");
const route = express.Router();
const authController = require("../../controllers/auth/auth.controller");

route.post("/register", authController.registerController);
route.patch("/verify", authController.verifyEmailByOtpController);
route.post("/sendOtp", authController.resendOtpController);
route.post("/login", authController.loginController);

module.exports = route;