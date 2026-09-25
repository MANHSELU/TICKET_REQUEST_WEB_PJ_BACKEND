const validateCreateTicket = (requesterId, itServiceId, ticketCategoryId, title, description) => {
    if (!requesterId || !itServiceId || !ticketCategoryId || !title || !description) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateTicketDetail = (ticketId, requesterId) => {
    if (!ticketId || !requesterId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

module.exports = { validateCreateTicket, validateTicketDetail };
