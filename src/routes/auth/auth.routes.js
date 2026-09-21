const express = require("express");
const route = express.Router();
const authController = require("../../controllers/auth/auth.controller");

route.post("/register", authController.registerController);
route.patch("/verify", authController.verifyEmailByOtpController);
route.post("/sendOtp", authController.resendOtpController);
route.post("/login", authController.loginController);
route.post("/forgot-password", authController.forgotPassController);
route.post("/verify-reset-otp", authController.verifyResetOtpController);
route.post("/reset-password", authController.resetPasswordController);

module.exports = route;