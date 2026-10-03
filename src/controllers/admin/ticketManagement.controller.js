const { findAllTicket } = require("../../services/admin/ticketManagement.service");

const findAllTicketController = async (req, res) => {
    try {
        const tickets = await findAllTicket();
        return res.status(200).json({ message: "Lấy danh sách yêu cầu thành công", data: tickets });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { findAllTicketController };
