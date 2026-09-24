const profileManagementRepository = require("../../repositories/common/profileManagement.repository")
const bcrypt = require("bcryptjs");
const { uploadAvatar } = require("../upload/uploadImg.service");

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

const viewProfile = async (userId) => {
    const user = await profileManagementRepository.findInformationByUserId(userId);
    if(!user) {
        throw {
            status: 404,
            message: "Không tìm thấy người dùng"
        };
    };
    return user;
};

const updateProfile = async (userId, fullName, phone, fileBuffer) => {
    const user = await profileManagementRepository.findByUserId(userId);
    if(!user) {
        throw {
            status: 404,
            message: "Không tìm thấy người dùng"
        };
    };
    let imgUrl = user.imgUrl;
    if(fileBuffer) {
        imgUrl = await uploadAvatar(fileBuffer)
    };
    const updatedProfile = await profileManagementRepository.updateProfile(userId, fullName, phone, imgUrl);
    return updatedProfile;
};

module.exports = { changePassword, viewProfile, updateProfile }