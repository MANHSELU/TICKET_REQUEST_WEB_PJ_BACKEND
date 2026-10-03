const ItServiceCategory = require("../../model/itServiceCategory.model");
const { Op } = require("sequelize");

const createItServiceCategory = async (data) => {
    return await ItServiceCategory.create(data);
};

const getItServiceCategory = async () => {
    return await ItServiceCategory.findAll();
};

const updateItServiceCategory = async (categoryId, data) => {
    return await ItServiceCategory.update(data, { where: { id: categoryId } });
};

const searchItServiceCategory = async (keyword) => {
    return await ItServiceCategory.findAll({
        where: {
            categoryName: {
                [Op.like]: `%${keyword}%`,
            },
        },
    });
};

module.exports = { createItServiceCategory, getItServiceCategory, updateItServiceCategory, searchItServiceCategory };
