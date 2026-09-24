const validateCreateTicketCategory = (categoryName, description) => {
    if (!categoryName || !description) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateUpdateTicketCategory = (categoryId, categoryName, description) => {
    if (!categoryId || !categoryName || !description) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

module.exports = { validateCreateTicketCategory, validateUpdateTicketCategory };
