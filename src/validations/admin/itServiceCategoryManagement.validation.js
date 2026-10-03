const validateCreateItServiceCategory = (categoryName, description) => {
    if (!categoryName) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateUpdateItServiceCategory = (categoryId, categoryName, description) => {
    if (!categoryId || !categoryName) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

module.exports = { validateCreateItServiceCategory, validateUpdateItServiceCategory };
