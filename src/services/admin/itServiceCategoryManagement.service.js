const itServiceCategoryRepository = require("../../repositories/admin/itServiceCategoryManagement.repository");

const createItServiceCategory = async (categoryName, description) => {
    const category = await itServiceCategoryRepository.createItServiceCategory({
        categoryName: categoryName,
        description: description,
    });
    return category;
};

const findAllItServiceCategory = async () => {
    const categories = await itServiceCategoryRepository.getItServiceCategory();
    return categories;
};

const updateItServiceCategory = async (categoryId, categoryName, description, isActive) => {
    const category = await itServiceCategoryRepository.updateItServiceCategory(categoryId, {
        categoryName: categoryName,
        description: description,
        isActive: isActive,
    });
    return category;
};

const searchItServiceCategory = async (keyword) => {
    return await itServiceCategoryRepository.searchItServiceCategory(keyword);
};

module.exports = { createItServiceCategory, findAllItServiceCategory, updateItServiceCategory, searchItServiceCategory };
