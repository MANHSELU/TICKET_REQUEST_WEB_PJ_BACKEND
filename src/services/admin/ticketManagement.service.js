const ticketManagementRepository = require("../../repositories/admin/ticketManagement.repository");

const findAllTicket = async () => {
    return await ticketManagementRepository.getAllTicket();
};

module.exports = { findAllTicket };
