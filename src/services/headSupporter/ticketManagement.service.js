const ticketManagementRepository = require("../../repositories/headSupporter/ticketManagement.repository");

const closeAnyTicket = async (ticketId) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.status !== "IN_PROGRESS") {
        throw { status: 400, message: "Chỉ có thể đóng yêu cầu đang xử lý" };
    };
    await ticketManagementRepository.closeTicket(ticketId);
    return await ticketManagementRepository.findById(ticketId);
};

const assignTicket = async (ticketId, supporterId) => {
    const ticket = await ticketManagementRepository.findById(ticketId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    await ticketManagementRepository.assignTicket(ticketId, supporterId);
    return await ticketManagementRepository.findById(ticketId);
};

module.exports = { closeAnyTicket, assignTicket };
