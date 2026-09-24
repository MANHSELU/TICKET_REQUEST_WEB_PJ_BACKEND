const SupportTeam = require("../../model/supportTeam.model");
const { Op } = require("sequelize");

const createSupportTeam = async (data) => {
    return await SupportTeam.create(data);
};

const getSupportTeam = async () => {
    return await SupportTeam.findAll();
};

const updateSupportTeam = async (teamId, data) => {
    return await SupportTeam.update(data, { where: { id: teamId } });
};

const searchSupportTeam = async (keyword) => {
    return await SupportTeam.findAll({
        where: {
            teamName: {
                [Op.like]: `%${keyword}%`,
            },
        },
    });
};

module.exports = { createSupportTeam, getSupportTeam, updateSupportTeam, searchSupportTeam };
