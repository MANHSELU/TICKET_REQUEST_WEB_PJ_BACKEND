const express = require("express");
const route = express.Router();
const ticketManagementController = require("../../controllers/headSupporter/ticketManagement.controller");

route.patch("/tickets/:ticketId/close", ticketManagementController.closeAnyTicketController);
route.patch("/tickets/:ticketId/assign", ticketManagementController.assignTicketController);

module.exports = route;
