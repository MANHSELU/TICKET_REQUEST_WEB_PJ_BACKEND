const ticketRequestManagementRepository = require("../../repositories/requester/ticketRequestManagement.repository");
const ticketCategoryRepository = require("../../repositories/admin/ticketCategoryManagement.repository");
const { uploadTicketAttachment } = require("../upload/uploadImg.service");

const createTicketService = async (requesterId, itServiceId, ticketCategoryId, title, description, files = []) => {
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

    for (const file of files) {
        const fileUrl = await uploadTicketAttachment(file.buffer);
        await ticketRequestManagementRepository.createAttachment({
            ticketId: ticket.id,
            fileUrl,
            fileName: file.originalname,
        });
    };

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

const findAllItService = async () => {
    return await ticketRequestManagementRepository.findAllItService();
};

const findAllTicketCategory = async () => {
    return await ticketRequestManagementRepository.findAllTicketCategory();
};

const sendMessage = async (ticketId, requesterId, message) => {
    const ticket = await ticketRequestManagementRepository.findByIdAndRequesterId(ticketId, requesterId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    if (ticket.status === "CLOSED") {
        throw { status: 400, message: "Yêu cầu này đã đóng, không thể gửi tin nhắn" };
    };
    return await ticketRequestManagementRepository.sendMessage({
        ticketId,
        senderId: requesterId,
        message,
    });
};

const findMessage = async (ticketId, requesterId) => {
    const ticket = await ticketRequestManagementRepository.findByIdAndRequesterId(ticketId, requesterId);
    if (!ticket) {
        throw { status: 404, message: "Không tìm thấy yêu cầu hỗ trợ" };
    };
    return await ticketRequestManagementRepository.findMessage(ticketId);
};

module.exports = { createTicketService, findMyTickets, findMyTicketDetail, findAllItService, findAllTicketCategory, sendMessage, findMessage };
