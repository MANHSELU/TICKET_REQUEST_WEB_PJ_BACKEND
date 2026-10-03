const ItServices = require ("../../model/itService.model");
const ItServiceCategory = require("../../model/itServiceCategory.model");
const { Op } = require("sequelize");

const createItService = async (data) => {
    return await ItServices.create(data);
};

const getItService = async () => {
    return await ItServices.findAll({
        include: { model: ItServiceCategory, as: "category" },
    });
};

const updateItService = async (serviceId, data) => {
    return await ItServices.update(data, { where: { id: serviceId } });
};

const searchItService = async (keyword) => {
    return await ItServices.findAll({
        where: {
            service_name: {
                [Op.like]: `%${keyword}%`,
            },
        },
        include: { model: ItServiceCategory, as: "category" },
    });
};

module.exports = { createItService, getItService, updateItService, searchItService }