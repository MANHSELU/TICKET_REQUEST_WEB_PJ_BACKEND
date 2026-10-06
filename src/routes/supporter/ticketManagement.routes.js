const express = require("express");
const route = express.Router();
const ticketManagementController = require("../../controllers/supporter/ticketManagement.controller");
const announcementController = require("../../controllers/supporter/announcement.controller");
const upload = require("../../middlewares/upload.middleware");

route.get("/tickets", ticketManagementController.findAllTicketController);
route.get("/tickets/closed", ticketManagementController.findMyClosedTicketController);
route.get("/tickets/:ticketId", ticketManagementController.findTicketDetailController);
route.patch("/tickets/:ticketId/accept", ticketManagementController.acceptTicketController);
route.patch("/tickets/:ticketId/close", ticketManagementController.closeTicketController);

route.post("/messages", ticketManagementController.sendMessageController);
route.get("/tickets/:ticketId/messages", ticketManagementController.findMessageController);

// Announcements
route.post("/announcements", upload.single("image"), announcementController.createAnnouncementController);
route.get("/announcements", announcementController.findAllAnnouncementController);
route.get("/announcements/mine", announcementController.findMyAnnouncementController);

module.exports = route;
