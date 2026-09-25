const Ticket = require("../../model/ticket.model");

const createTicket = async (data) => {
    return await Ticket.create(data);
};

const findByRequesterId = async (requesterId) => {
    return await Ticket.findAll({ where: { requesterId } });
};

const findByIdAndRequesterId = async (ticketId, requesterId) => {
    return await Ticket.findOne({ where: { id: ticketId, requesterId } });
};

module.exports = { createTicket, findByRequesterId, findByIdAndRequesterId }