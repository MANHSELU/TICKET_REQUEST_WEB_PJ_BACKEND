const validateTicketDetail = (ticketId) => {
    if (!ticketId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

const validateAcceptTicket = (ticketId, assigneeId) => {
    if (!ticketId || !assigneeId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

const validateCloseTicket = (ticketId, assigneeId) => {
    if (!ticketId || !assigneeId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

const validateSendMessage = (ticketId, senderId, message) => {
    if(!ticketId || !senderId || !message) {
        throw {
            status: 404,
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

module.exports = { validateTicketDetail, validateAcceptTicket, validateCloseTicket, validateSendMessage, validateFindMessage };
