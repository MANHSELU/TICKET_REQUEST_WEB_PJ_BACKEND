const ticketCategoryRepository = require("../../repositories/admin/ticketCategoryManagement.repository");

const createTicketCategory = async (categoryName, description) => {
    const category = await ticketCategoryRepository.createTicketCategory({
        category_name: categoryName,
        description: description,
    });
    return category;
};

const findAllTicketCategory = async () => {
    const categories = await ticketCategoryRepository.getTicketCategory();
    return categories;
};

const updateTicketCategory = async (categoryId, categoryName, description) => {
    const category = await ticketCategoryRepository.updateTicketCategory(categoryId, {
        category_name: categoryName,
        description: description,
    });
    return category;
};

const searchTicketCategory = async (keyword) => {
    return await ticketCategoryRepository.searchTicketCategory(keyword);
};

module.exports = { createTicketCategory, findAllTicketCategory, updateTicketCategory, searchTicketCategory };
