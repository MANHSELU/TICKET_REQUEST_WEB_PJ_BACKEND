const validateCreateItService = (serviceName, description) => {
    if(!serviceName || !description) {
        throw {
            status: 404,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateUpdateItService = (serviceId, serviceName, description) => {
    if (!serviceId || !serviceName || !description) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

module.exports = { validateCreateItService, validateUpdateItService }