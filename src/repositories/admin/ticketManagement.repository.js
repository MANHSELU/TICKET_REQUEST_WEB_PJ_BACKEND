const Ticket = require("../../model/ticket.model");
const User = require("../../model/users.model");
const ItService = require("../../model/itService.model");
const TicketCategory = require("../../model/ticketCategory.model");

const getAllTicket = async () => {
    return await Ticket.findAll({
        include: [
            { model: User, as: "requester", attributes: ["id", "fullName", "email"] },
            { model: ItService, as: "itService", attributes: ["id", "service_name"] },
            { model: TicketCategory, as: "ticketCategory", attributes: ["id", "category_name"] },
        ],
        order: [["createdAt", "DESC"]],
    });
};

module.exports = { getAllTicket };
