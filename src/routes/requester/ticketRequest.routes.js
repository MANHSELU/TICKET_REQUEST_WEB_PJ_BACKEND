const express = require("express");
const route = express.Router();
const ticketRequestController = require("../../controllers/requester/ticketRequestManagement.controller");
const upload = require("../../middlewares/upload.middleware");

route.post("/tickets", upload.array("attachments", 5), ticketRequestController.createTicketController);
route.get("/tickets", ticketRequestController.findMyTicketsController);
route.get("/tickets/:ticketId", ticketRequestController.findMyTicketDetailController);
route.get("/services", ticketRequestController.findItServiceController);
route.get("/ticket-categories", ticketRequestController.findTicketCategoryController);

route.post("/messages", ticketRequestController.sendMessageController);
route.get("/tickets/:ticketId/messages", ticketRequestController.findMessageController);

module.exports = route;
