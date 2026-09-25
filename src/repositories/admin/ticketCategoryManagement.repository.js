const TicketCategory = require("../../model/ticketCategory.model");
const { Op } = require("sequelize");

const createTicketCategory = async (data) => {
    return await TicketCategory.create(data);
};

const getTicketCategory = async () => {
    return await TicketCategory.findAll();
};

const updateTicketCategory = async (categoryId, data) => {
    return await TicketCategory.update(data, { where: { id: categoryId } });
};

const searchTicketCategory = async (keyword) => {
    return await TicketCategory.findAll({
        where: {
            category_name: {
                [Op.like]: `%${keyword}%`,
            },
        },
    });
};

const findById = async (categoryId) => {
    return await TicketCategory.findOne({ where: { id: categoryId } });
};


module.exports = { createTicketCategory, getTicketCategory, updateTicketCategory, searchTicketCategory, findById };
