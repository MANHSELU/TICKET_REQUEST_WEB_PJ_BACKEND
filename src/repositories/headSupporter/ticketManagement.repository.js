const Ticket = require("../../model/ticket.model");

const findById = async (ticketId) => {
    return await Ticket.findOne({ where: { id: ticketId } });
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

const assignTicket = async (ticketId, supporterId) => {
    return await Ticket.update(
        {
            currentAssigneeId: supporterId,
            status: "IN_PROGRESS",
        },
        { where: { id: ticketId } }
    );
};

module.exports = { findById, closeTicket, assignTicket };
