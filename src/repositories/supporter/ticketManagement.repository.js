const Ticket = require("../../model/ticket.model");
const TicketMessage = require("../../model/ticketMessage.model");

const getAllTicket = async () => {
    return await Ticket.findAll();
};

const findById = async (ticketId) => {
    return await Ticket.findOne({ where: { id: ticketId } });
};

const acceptTicket = async (ticketId, assigneeId) => {
    return await Ticket.update(
        {
            currentAssigneeId: assigneeId,
            status: "IN_PROGRESS",
        },
        { where: { id: ticketId } }
    );
};

const closeTicket = async (ticketId) => {
    const now = new Date();
    return await Ticket.update(
        {
            status: "CLOSED",
            resolvedAt: now,
            closedAt: now,
        },
        { where: { id: ticketId } }
    );
};

const sendMessage = async (data) => {
    return await TicketMessage.create(data);
};

const findMessage = async (ticketId, senderId) => {
    return await TicketMessage.findAll({
        where: { ticketId, senderId },
        order: [["createdAt", "ASC"]],
    });
};

module.exports = { getAllTicket, findById, acceptTicket, closeTicket, sendMessage, findMessage };
