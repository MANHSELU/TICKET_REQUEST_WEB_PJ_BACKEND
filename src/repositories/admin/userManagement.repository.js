const User = require("../../model/users.model");
const { Op } = require("sequelize");

const createUser = async(data) => {
    return await User.create(data);
};

const findUser = async(email) => {
    return await User.findOne({ where: { email: email } });
};

const findById = async (userId) => {
    return await User.findOne({
        where: { id: userId },
        attributes: ["id", "fullName", "phone", "email", "role", "teamId", "isActive"],
    });
};

const getUser = async () => {
    return await User.findAll({
        attributes: ["id", "fullName", "phone", "email", "role", "teamId", "isActive"],
    });
};

const updateUserStatus = async (userId, isActive) => {
    return await User.update({ isActive }, { where: { id: userId } });
};

const searchUser = async (keyword) => {
    return await User.findAll({
        where: {
            fullName: {
                [Op.like]: `%${keyword}%`,
            },
        },
        attributes: ["id", "fullName", "phone", "email", "role", "teamId", "isActive"],
    });
};

module.exports = { createUser, findUser, findById, getUser, updateUserStatus, searchUser }