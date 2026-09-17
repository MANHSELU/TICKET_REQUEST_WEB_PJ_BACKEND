const User = require("../../model/users.model");
const AccountVerification = require ("../../model/accountVerification.model");

const findByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
};
const createUser = async (data) => {
    return await User.create(data); 
};

const createOtp = async ({userId, otp, expiresAt}) => {
    return await AccountVerification.create({ userId, otp, expiresAt });
};

const findByUserIdAndOtp = async (userId, otp) => {
    return await AccountVerification.findOne({ where: { userId, otp } });
};

const deleteOtpById = async (id) => {
    return await AccountVerification.destroy({ where: { id } });
};

const activeUser = async (userId) => {
    return await User.update({ isActive: true }, { where: { id: userId } });
};


module.exports = { findByEmail, createUser, createOtp, findByUserIdAndOtp, deleteOtpById, activeUser};