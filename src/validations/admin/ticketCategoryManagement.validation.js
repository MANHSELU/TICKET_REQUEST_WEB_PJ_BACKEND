const PRIORITY = require("../../constants/priority.constant");

const validateCreateTicketCategory = (categoryName, description, defaultPriority) => {
    if (!categoryName || !description || !defaultPriority) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
    if (!Object.values(PRIORITY).includes(defaultPriority)) {
        throw {
            status: 400,
            message: "Mức độ ưu tiên không hợp lệ"
        };
    };
};

const validateUpdateTicketCategory = (categoryId, categoryName, description, defaultPriority) => {
    if (!categoryId || !categoryName || !description || !defaultPriority) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
    if (!Object.values(PRIORITY).includes(defaultPriority)) {
        throw {
            status: 400,
            message: "Mức độ ưu tiên không hợp lệ"
        };
    };
};

module.exports = { validateCreateTicketCategory, validateUpdateTicketCategory };
