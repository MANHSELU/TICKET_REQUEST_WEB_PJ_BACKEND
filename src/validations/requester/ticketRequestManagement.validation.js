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

const validateSendMessage = (ticketId, senderId, message) => {
    if (!ticketId || !senderId || !message) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

const validateFindMessage = (ticketId, senderId) => {
    if (!ticketId || !senderId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

module.exports = { validateCreateTicket, validateTicketDetail, validateSendMessage, validateFindMessage };
