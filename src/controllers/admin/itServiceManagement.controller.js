const { validateCreateItService, validateUpdateItService  } = require("../../validations/admin/itServiceManagement.validation");
const { createItService, findAllItService, updateItService, searchItService } = require("../../services/admin/itServiceManagement.service");

const createItServiceController = async (req, res) => {
    try {
        const { serviceName, description } = req.body;
        await validateCreateItService(serviceName, description);
        await createItService(serviceName, description); 
        return res.status(201).json({ message: "Tạo mới dịch vụ thành công" });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const findItServiceController = async (req, res) => {
    try {
        const itService = await findAllItService();
        return res.status(200).json({ data: itService });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const updateItServiceController = async (req, res) => {
    try {
    const { serviceId } = req.params;
    const { serviceName, description } = req.body;
    await validateUpdateItService(serviceId, serviceName, description);
    await updateItService( serviceId, serviceName, description );
    return res.status(201).json({ message: "Cập nhật thông tin dịch vụ thành công" });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const searchItServiceController = async (req, res) => {
    try {
        const { keyword } = req.query;
        const itServices = await searchItService(keyword);
        return res.status(200).json({ data: itServices });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};


module.exports = { createItServiceController, findItServiceController, updateItServiceController, searchItServiceController }