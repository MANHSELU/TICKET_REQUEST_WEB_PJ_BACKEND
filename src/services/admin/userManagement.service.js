const userManagementRepository = require("../../repositories/admin/userManagement.repository");
const bcrypt = require("bcryptjs");

const createUserService = async (fullName, phone, email, password, role, teamId) => {
    const user = await userManagementRepository.findUser(email);
    if(user) {
        throw {
            status: 400,
            message: "Người dùng đã tồn tại"
        };
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userManagementRepository.createUser({
        fullName,
        phone,
        email,
        password: hashedPassword,        
        role, 
        teamId,
        isActive: true,
    });
    return newUser;
};

const findAllUser = async () => {
    return await userManagementRepository.getUser();
};

const updateUserStatusService = async (userId, isActive) => {
    const user = await userManagementRepository.findById(userId);
    if (!user) {
        throw { status: 404, message: "Không tìm thấy người dùng" };
    };
    await userManagementRepository.updateUserStatus(userId, isActive);
    return await userManagementRepository.findById(userId);
};

const searchUserService = async (keyword) => {
    return await userManagementRepository.searchUser(keyword);
};

module.exports = { createUserService, findAllUser, updateUserStatusService, searchUserService }