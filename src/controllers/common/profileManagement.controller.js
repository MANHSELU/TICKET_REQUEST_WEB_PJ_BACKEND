const { changePassword, viewProfile, updateProfile } = require("../../services/common/profileManagement.service");
const { validateChangePass, validateViewProfile, validateUpdateProfile } = require("../../validations/common/profileManagement.validation");

const changePassController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        await validateChangePass(userId, oldPassword, newPassword, confirmPassword);
        await changePassword(userId, oldPassword, newPassword);
        return res.status(201).json({ message: "Đổi mật khẩu thành công"});
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const viewProfileController = async (req, res) => {
    try {
        const { userId } = req.user;
        await validateViewProfile(userId);
        const userProfile = await viewProfile(userId);
        return res.status(200).json({ userProfile });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const updateProfileController = async (req, res) => {
    try {
        const { userId } = req.user; 
        const { fullName, phone } = req.body;
        const fileBuffer = req.file ? req.file.buffer : undefined;
        await validateUpdateProfile(userId, fullName, phone, fileBuffer);
        await updateProfile(userId, fullName, phone, fileBuffer);
        return res.status(201).json( {
            message: "Cập nhật thông tin người dùng thành công",
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

module.exports = { changePassController, viewProfileController, updateProfileController }