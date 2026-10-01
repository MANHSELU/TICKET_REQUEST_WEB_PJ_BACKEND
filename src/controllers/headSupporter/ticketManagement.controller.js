const { validateCloseAnyTicket, validateAssignTicket } = require("../../validations/headSupporter/ticketManagement.validation");
const { closeAnyTicket, assignTicket } = require("../../services/headSupporter/ticketManagement.service");

const closeAnyTicketController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        await validateCloseAnyTicket(ticketId);
        const ticket = await closeAnyTicket(ticketId);
        return res.status(200).json({ message: "Đóng yêu cầu thành công", data: ticket });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const assignTicketController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { supporterId } = req.body;
        await validateAssignTicket(ticketId, supporterId);
        const ticket = await assignTicket(ticketId, supporterId);
        return res.status(200).json({ message: "Gán yêu cầu thành công", data: ticket });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { closeAnyTicketController, assignTicketController };
