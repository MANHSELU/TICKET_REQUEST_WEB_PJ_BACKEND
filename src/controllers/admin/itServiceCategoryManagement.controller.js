const { validateCreateItServiceCategory, validateUpdateItServiceCategory } = require("../../validations/admin/itServiceCategoryManagement.validation");
const { createItServiceCategory, findAllItServiceCategory, updateItServiceCategory, searchItServiceCategory } = require("../../services/admin/itServiceCategoryManagement.service");

const createItServiceCategoryController = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        await validateCreateItServiceCategory(categoryName, description);
        await createItServiceCategory(categoryName, description);
        return res.status(201).json({ message: "Tạo mới nhóm dịch vụ thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findItServiceCategoryController = async (req, res) => {
    try {
        const categories = await findAllItServiceCategory();
        return res.status(200).json({ message: "Lấy danh sách nhóm dịch vụ thành công", data: categories });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const updateItServiceCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, description, isActive } = req.body;
        await validateUpdateItServiceCategory(categoryId, categoryName, description);
        const category = await updateItServiceCategory(categoryId, categoryName, description, isActive);
        return res.status(200).json({ message: "Cập nhật nhóm dịch vụ thành công", data: category });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const searchItServiceCategoryController = async (req, res) => {
    try {
        const { keyword } = req.query;
        const categories = await searchItServiceCategory(keyword);
        return res.status(200).json({ message: "Tìm kiếm thành công", data: categories });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createItServiceCategoryController, findItServiceCategoryController, updateItServiceCategoryController, searchItServiceCategoryController };
