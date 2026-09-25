const express = require("express");
const route = express.Router();
const itServiceManagementController = require("../../controllers/admin/itServiceManagement.controller");
const ticketCategoryManagementController = require("../../controllers/admin/ticketCategory.controller");
const supportTeamManagementController = require("../../controllers/admin/supportTeamManagement.controller");
const userManagementController = require("../../controllers/admin/userManagement.controller");

// IT Services
route.post("/services", itServiceManagementController.createItServiceController);
route.patch("/services/:serviceId", itServiceManagementController.updateItServiceController);
route.get("/services", itServiceManagementController.findItServiceController);
route.get("/services/search", itServiceManagementController.searchItServiceController);

// Ticket Categories
route.post("/ticket-categories", ticketCategoryManagementController.createTicketCategoryController);
route.get("/ticket-categories", ticketCategoryManagementController.findTicketCategoryController);
route.get("/ticket-categories/search", ticketCategoryManagementController.searchTicketCategoryController);
route.patch("/ticket-categories/:categoryId", ticketCategoryManagementController.updateTicketCategoryController);

// Support Teams
route.post("/support-teams", supportTeamManagementController.createSupportTeamController);
route.get("/support-teams", supportTeamManagementController.findSupportTeamController);
route.get("/support-teams/search", supportTeamManagementController.searchSupportTeamController);
route.patch("/support-teams/:teamId", supportTeamManagementController.updateSupportTeamController);

// Users
route.post("/users", userManagementController.createUserController);
route.get("/users", userManagementController.findUserController);
route.get("/users/search", userManagementController.searchUserController);
route.patch("/users/:userId/status", userManagementController.updateUserStatusController);

module.exports = route;