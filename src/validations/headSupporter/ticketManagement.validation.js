const validateCloseAnyTicket = (ticketId) => {
    if (!ticketId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

const validateAssignTicket = (ticketId, supporterId) => {
    if (!ticketId || !supporterId) {
        throw {
            status: 400,
            message: "Thiếu thông tin yêu cầu"
        };
    };
};

module.exports = { validateCloseAnyTicket, validateAssignTicket };
