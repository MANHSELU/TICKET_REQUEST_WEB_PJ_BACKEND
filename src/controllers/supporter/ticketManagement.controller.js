const { validateTicketDetail, validateAcceptTicket, validateCloseTicket, validateSendMessage, validateFindMessage } = require("../../validations/supporter/ticketManagement.validation");
const { findAllTicket, findMyClosedTicket, findTicketDetail, acceptTicket, closeTicket, sendMessage, findMessage } = require("../../services/supporter/ticketManagement.service");

const findAllTicketController = async (req, res) => {
    try {
        const tickets = await findAllTicket();
        return res.status(200).json({ message: "Lấy danh sách yêu cầu thành công", data: tickets });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findMyClosedTicketController = async (req, res) => {
    try {
        const { userId } = req.user;
        const tickets = await findMyClosedTicket(userId);
        return res.status(200).json({ message: "Lấy lịch sử xử lý thành công", data: tickets });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findTicketDetailController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        await validateTicketDetail(ticketId);
        const ticket = await findTicketDetail(ticketId);
        return res.status(200).json({ message: "Lấy chi tiết yêu cầu thành công", data: ticket });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const acceptTicketController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { ticketId } = req.params;
        await validateAcceptTicket(ticketId, userId);
        await acceptTicket(ticketId, userId);
        return res.status(200).json({ message: "Tiếp nhận yêu cầu thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const closeTicketController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { ticketId } = req.params;
        await validateCloseTicket(ticketId, userId);
        await closeTicket(ticketId, userId);
        return res.status(200).json({ message: "Đóng yêu cầu thành công" });
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
}

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

module.exports = { findAllTicketController, findMyClosedTicketController, findTicketDetailController, acceptTicketController, closeTicketController, sendMessageController, findMessageController };
