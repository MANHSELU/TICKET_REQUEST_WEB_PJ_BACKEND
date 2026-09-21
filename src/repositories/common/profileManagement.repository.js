const User = require("../../model/users.model");
const { where } = require("sequelize");

const findByUserId = async (userId) => {
    return await User.findOne({ where: {id: userId } });
};

const updatePass = async (userId, password) => {
    return await User.update({ password }, { where: { id :userId } });
};

const findInformationByUserId = async (userId) => {
    return await User.findOne({ attributes: ["id", "fullName", "phone", "email", "role", "imgUrl", "isActive"], where: { id: userId }  });
};

const updateProfile = async (userId, fullName, phone, imgUrl) => {
    return await User.update({ fullName, phone, imgUrl }, {where: {id: userId } });
};

module.exports = { findByUserId, updatePass, findInformationByUserId, updateProfile }