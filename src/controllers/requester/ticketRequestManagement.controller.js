const { validateCreateTicket, validateTicketDetail } = require("../../validations/requester/ticketRequestManagement.validation");
const { createTicketService, findMyTickets, findMyTicketDetail } = require("../../services/requester/ticketRequestManagement.services");

const createTicketController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { itServiceId, ticketCategoryId, title, description } = req.body;
        await validateCreateTicket(userId, itServiceId, ticketCategoryId, title, description);
        const ticket = await createTicketService(userId, itServiceId, ticketCategoryId, title, description);
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

module.exports = { createTicketController, findMyTicketsController, findMyTicketDetailController };
