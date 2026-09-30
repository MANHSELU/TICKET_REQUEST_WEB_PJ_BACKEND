const Ticket = require("../../model/ticket.model");
const ItService = require("../../model/itService.model");
const TicketCategory = require("../../model/ticketCategory.model");
const TicketMessage = require("../../model/ticketMessage.model");

const createTicket = async (data) => {
    return await Ticket.create(data);
};

const findByRequesterId = async (requesterId) => {
    return await Ticket.findAll({ where: { requesterId } });
};

const findByIdAndRequesterId = async (ticketId, requesterId) => {
    return await Ticket.findOne({ where: { id: ticketId, requesterId } });
};

const findAllItService = async () => {
    return await ItService.findAll();
};

const findAllTicketCategory = async () => {
    return await TicketCategory.findAll();
};

const sendMessage = async (data) => {
    return await TicketMessage.create(data);
};

const findMessage = async (ticketId) => {
    return await TicketMessage.findAll({
        where: { ticketId },
        order: [["createdAt", "ASC"]],
    });
};

module.exports = { createTicket, findByRequesterId, findByIdAndRequesterId, findAllItService, findAllTicketCategory, sendMessage, findMessage }