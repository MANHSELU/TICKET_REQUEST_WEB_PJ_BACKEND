const express = require("express");
const route = express.Router();
const profileManagementController = require("../../controllers/common/profileManagement.controller");
const upload = require("../../middlewares/upload.middleware");

route.patch("/changePass", profileManagementController.changePassController);
route.get("/profile", profileManagementController.viewProfileController);
route.patch("/profile", upload.single("avatar"), profileManagementController.updateProfileController);

module.exports = route;

