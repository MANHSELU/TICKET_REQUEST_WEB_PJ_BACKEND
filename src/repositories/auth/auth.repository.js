const User = require("../../model/users.model");
const AccountVerification = require ("../../model/accountVerification.model");
const RefreshToken = require("../../model/refreshToken.model");

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

const findOtpByUserId = async  (userId) => {
    return await AccountVerification.findOne({ where: { userId } });
};

const deleteOtpByUserId = async (userId) => {
    return await AccountVerification.destroy({ where: { userId } });
}

const upsertRefreshToken = async ({ userId, token, expiresAt }) => {
    const existing = await RefreshToken.findOne({ where: { userId } });
    if (existing) {
        return await existing.update({ token, expiresAt });
    }
    return await RefreshToken.create({ userId, token, expiresAt });
};

const findRefreshToken = async (userId, token) => {
    return await RefreshToken.findOne({ where: { userId, token } });
};

const deleteRefreshTokenByUserId = async (userId) => {
    return await RefreshToken.destroy({ where: { userId } });
};


module.exports = { findByEmail, createUser, createOtp, findByUserIdAndOtp, deleteOtpById, activeUser, findOtpByUserId,  deleteOtpByUserId, upsertRefreshToken, findRefreshToken, deleteRefreshTokenByUserId};