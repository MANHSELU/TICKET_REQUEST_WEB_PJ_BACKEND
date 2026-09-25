const ticketRequestManagementRepository = require("../../repositories/requester/ticketRequestManagement.repository");
const ticketCategoryRepository = require("../../repositories/admin/ticketCategoryManagement.repository");

const createTicketService = async (requesterId, itServiceId, ticketCategoryId, title, description) => {
    const category = await ticketCategoryRepository.findById(ticketCategoryId);
    if (!category) {
        throw { status: 404, message: "Không tìm thấy danh mục yêu cầu" };
    };
    const ticket = await ticketRequestManagementRepository.createTicket({
        requesterId,
        itServiceId,
        ticketCategoryId,
        title,
        description,
        priority: category.defaultPriority,
    });
    return ticket;
};

const findMyTickets = async (requesterId) => {
    return await ticketRequestManagementRepository.findByRequesterId(requesterId);
};

const findMyTicketDetail = async (ticketId, requesterId) => {
    const ticket = await ticketRequestManagementRepository.findByIdAndRequesterId(ticketId, requesterId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    return ticket;
};

module.exports = { createTicketService, findMyTickets, findMyTicketDetail };
