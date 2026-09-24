const { validateCreateTicketCategory, validateUpdateTicketCategory } = require("../../validations/admin/ticketCategoryManagement.validation");
const { createTicketCategory, findAllTicketCategory, updateTicketCategory, searchTicketCategory } = require("../../services/admin/ticketCategoryManagement.service");

const createTicketCategoryController = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        await validateCreateTicketCategory(categoryName, description);
        await createTicketCategory(categoryName, description);
        return res.status(201).json({ message: "Tạo mới danh mục thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findTicketCategoryController = async (req, res) => {
    try {
        const categories = await findAllTicketCategory();
        return res.status(200).json({ data: categories });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const updateTicketCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, description } = req.body;
        await validateUpdateTicketCategory(categoryId, categoryName, description);
        const category = await updateTicketCategory(categoryId, categoryName, description);
        return res.status(200).json({ message: "Cập nhật danh mục thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const searchTicketCategoryController = async (req, res) => {
    try {
        const { keyword } = req.query;
        const categories = await searchTicketCategory(keyword);
        return res.status(200).json({ data: categories });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createTicketCategoryController, findTicketCategoryController, updateTicketCategoryController, searchTicketCategoryController };
