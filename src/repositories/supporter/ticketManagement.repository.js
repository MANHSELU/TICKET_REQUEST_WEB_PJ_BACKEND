const Ticket = require("../../model/ticket.model");
const TicketMessage = require("../../model/ticketMessage.model");
const TicketAttachment = require("../../model/ticketAttachment.model");
const ItService = require("../../model/itService.model");
const TicketCategory = require("../../model/ticketCategory.model");
const User = require("../../model/users.model");

const TICKET_INCLUDE = [
    { model: User, as: "requester", attributes: { exclude: ["password"] } },
    { model: ItService, as: "itService" },
    { model: TicketCategory, as: "ticketCategory" },
    { model: TicketAttachment, as: "attachments" },
];

const getAllTicket = async () => {
    return await Ticket.findAll({
        include: TICKET_INCLUDE,
        order: [["createdAt", "DESC"]],
    });
};

const findById = async (ticketId) => {
    return await Ticket.findOne({ where: { id: ticketId }, include: TICKET_INCLUDE });
};

const findClosedByAssigneeId = async (assigneeId) => {
    return await Ticket.findAll({
        where: { currentAssigneeId: assigneeId, status: "CLOSED" },
        include: TICKET_INCLUDE,
        order: [["closedAt", "DESC"]],
    });
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

const findMessage = async (ticketId) => {
    return await TicketMessage.findAll({
        where: { ticketId },
        order: [["createdAt", "ASC"]],
    });
};

module.exports = { getAllTicket, findById, findClosedByAssigneeId, acceptTicket, closeTicket, sendMessage, findMessage };
