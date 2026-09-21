const { changePassword } = require("../../services/common/profileManagement.service");
const { validateChangePass } = require("../../validations/common/profileManagement.validation");

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

module.exports = { changePassController }   