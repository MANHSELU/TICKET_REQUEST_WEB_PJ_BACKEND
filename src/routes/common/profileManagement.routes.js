const express = require("express");
const route = express.Router();
const profileManagementController = require("../../controllers/common/profileManagement.controller");

route.patch("/changePass", profileManagementController.changePassController);

module.exports = route;

