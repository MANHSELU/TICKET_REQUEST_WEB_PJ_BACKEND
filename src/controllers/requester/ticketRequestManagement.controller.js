const { validateCreateTicket, validateTicketDetail, validateSendMessage, validateFindMessage } = require("../../validations/requester/ticketRequestManagement.validation");
const { createTicketService, findMyTickets, findMyTicketDetail, findAllItService, findAllTicketCategory, sendMessage, findMessage } = require("../../services/requester/ticketRequestManagement.services");

const createTicketController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { itServiceId, ticketCategoryId, title, description } = req.body;
        await validateCreateTicket(userId, itServiceId, ticketCategoryId, title, description);
        const ticket = await createTicketService(userId, itServiceId, ticketCategoryId, title, description, req.files);
        return res.status(201).json({ message: "Tạo yêu cầu hỗ trợ thành công", data: ticket });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findMyTicketsController = async (req, res) => {
    try {
        const { userId } = req.user;
        const tickets = await findMyTickets(userId);
        return res.status(200).json({ message: "Lấy danh sách yêu cầu thành công", data: tickets });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findMyTicketDetailController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { ticketId } = req.params;
        await validateTicketDetail(ticketId, userId);
        const ticket = await findMyTicketDetail(ticketId, userId);
        return res.status(200).json({ message: "Lấy chi tiết yêu cầu thành công", data: ticket });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findItServiceController = async (req, res) => {
    try {
        const itServices = await findAllItService();
        return res.status(200).json({ message: "Lấy danh sách dịch vụ thành công", data: itServices });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findTicketCategoryController = async (req, res) => {
    try {
        const categories = await findAllTicketCategory();
        return res.status(200).json({ message: "Lấy danh sách danh mục thành công", data: categories });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const sendMessageController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { ticketId, message } = req.body;
        await validateSendMessage(ticketId, userId, message);
        await sendMessage(ticketId, userId, message);
        return res.status(201).json({ message: "Gửi tin nhắn thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findMessageController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { ticketId } = req.params;
        await validateFindMessage(ticketId, userId);
        const messages = await findMessage(ticketId, userId);
        return res.status(200).json({ message: "Lấy đoạn chat thành công", data: messages });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createTicketController, findMyTicketsController, findMyTicketDetailController, findItServiceController, findTicketCategoryController, sendMessageController, findMessageController };
