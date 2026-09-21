const User = require("../../model/users.model");
const { where } = require("sequelize");

const findByUserId = async (userId) => {
    return await User.findOne({ where: {id: userId } });
};

const updatePass = async (userId, password) => {
    return await User.update({ password }, { where: { id :userId } });
};

module.exports = { findByUserId, updatePass }