const profileManagementRepository = require("../../repositories/common/profileManagement.repository")
const bcrypt = require("bcryptjs");

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await profileManagementRepository.findByUserId(userId);
    if(!user) {
        throw {
            status: 404,
            message: "Không tìm thấy người dùng"
        };
    };
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch) {
        throw {
            status: 404,
            message: "Mật khẩu cũ của bạn không đúng, vui lòng thử lại"
        };
    };
    const hashedNewPass = await bcrypt.hash(newPassword,10);
    await profileManagementRepository.updatePass(userId, hashedNewPass);
};

module.exports = { changePassword } 