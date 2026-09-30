const express = require("express");
const route = express.Router();
const ticketRequestController = require("../../controllers/requester/ticketRequestManagement.controller");

route.post("/tickets", ticketRequestController.createTicketController);
route.get("/tickets", ticketRequestController.findMyTicketsController);
route.get("/tickets/:ticketId", ticketRequestController.findMyTicketDetailController);
route.get("/services", ticketRequestController.findItServiceController);
route.get("/ticket-categories", ticketRequestController.findTicketCategoryController);

module.exports = route;
