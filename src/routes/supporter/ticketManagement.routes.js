const express = require("express");
const route = express.Router();
const ticketManagementController = require("../../controllers/supporter/ticketManagement.controller");

route.get("/tickets", ticketManagementController.findAllTicketController);
route.get("/tickets/:ticketId", ticketManagementController.findTicketDetailController);
route.patch("/tickets/:ticketId/accept", ticketManagementController.acceptTicketController);
route.patch("/tickets/:ticketId/close", ticketManagementController.closeTicketController);

route.post("/messages", ticketManagementController.sendMessageController);
route.get("/tickets/:ticketId/messages", ticketManagementController.findMessageController);

module.exports = route;
