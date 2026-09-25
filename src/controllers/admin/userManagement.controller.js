const userManagementService = require("../../services/admin/userManagement.service");
const { validateCreateUser, validateUpdateUserStatus } = require("../../validations/admin/userManagement.validation");

const createUserController = async (req, res) => {
    try {
        const { fullName, phone, email, password, confirmPassword, role, teamId } = req.body;
        await validateCreateUser(fullName, phone, email, password, confirmPassword, role);
        await userManagementService.createUserService(fullName, phone, email, password, role, teamId);
        return res.status(201).json({message: "Tạo mới người dùng thành công"});
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findUserController = async (req, res) => {
    try {
        const users = await userManagementService.findAllUser();
        return res.status(200).json({ message: "Lấy danh sách người dùng thành công", data: users });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const updateUserStatusController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive } = req.body;
        await validateUpdateUserStatus(userId, isActive);
        const user = await userManagementService.updateUserStatusService(userId, isActive);
        return res.status(200).json({ message: "Cập nhật trạng thái người dùng thành công", data: user });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const searchUserController = async (req, res) => {
    try {
        const { keyword } = req.query;
        const users = await userManagementService.searchUserService(keyword);
        return res.status(200).json({ message: "Tìm kiếm thành công", data: users });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createUserController, findUserController, updateUserStatusController, searchUserController }