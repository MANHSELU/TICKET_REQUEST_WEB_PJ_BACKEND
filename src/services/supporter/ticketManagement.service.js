const ticketManagementRepository = require("../../repositories/supporter/ticketManagement.repository");

const findAllTicket = async () => {
    return await ticketManagementRepository.getAllTicket();
};

const findMyClosedTicket = async (assigneeId) => {
    return await ticketManagementRepository.findClosedByAssigneeId(assigneeId);
};

const findTicketDetail = async (ticketId) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    return ticket;
};

const acceptTicket = async (ticketId, assigneeId) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.currentAssigneeId) {
        throw { status: 400, message: "Yêu cầu này đã được tiếp nhận" };
    };
    await ticketManagementRepository.acceptTicket(ticketId, assigneeId);
    return await ticketManagementRepository.findById(ticketId);
};

const closeTicket = async (ticketId, assigneeId) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.status !== "IN_PROGRESS") {
        throw { status: 400, message: "Chỉ có thể đóng yêu cầu đang xử lý" };
    };
    if (ticket.currentAssigneeId !== assigneeId) {
        throw { status: 403, message: "Bạn không phải người đang xử lý yêu cầu này" };
    };
    await ticketManagementRepository.closeTicket(ticketId);
    return await ticketManagementRepository.findById(ticketId);
};

const sendMessage = async (ticketId, senderId, message) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if(!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.status === "OPEN" || ticket.status === "CLOSED") {
        throw { status: 400, message: "Chỉ có thể gửi tiếp nhận khi phiếu đã được tiếp nhận và chưa đóng" };
    };
    if (ticket.currentAssigneeId !== senderId) {
        throw { status: 403, message: "Bạn không phải người đang xử lý yêu cầu này" };
    };
    return await ticketManagementRepository.sendMessage({
        ticketId,
        senderId,
        message,
    });
};

const findMessage = async (ticketId, senderId) => {
      const ticket = await ticketManagementRepository.findById(ticketId);
    if(!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.currentAssigneeId !== senderId) {
        throw { status: 403, message: "Bạn không phải người đang xử lý yêu cầu này" };
    };
    return await ticketManagementRepository.findMessage(ticketId, senderId);
};

module.exports = { findAllTicket, findMyClosedTicket, findTicketDetail, acceptTicket, closeTicket, sendMessage, findMessage };
