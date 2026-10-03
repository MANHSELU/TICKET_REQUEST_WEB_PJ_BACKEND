const It_Service = require("../../model/itService.model");
const itServiceRepository = require("../../repositories/admin/itServiceManagement.repository")

const createItService = async (serviceName, description, itServiceCategoryId) => {
    const itService = await itServiceRepository.createItService({ service_name: serviceName, description: description, itServiceCategoryId: itServiceCategoryId });
    return itService;
};

const findAllItService = async () => {
    const itServices = await itServiceRepository.getItService();
    return itServices;
};

const updateItService = async (serviceId, serviceName, description, isActive, itServiceCategoryId) => {
    const itService = await itServiceRepository.updateItService( serviceId, { service_name: serviceName, description: description, isActive: isActive, itServiceCategoryId: itServiceCategoryId });
    return itService;
};

const searchItService = async (keyword) => {
    return await itServiceRepository.searchItService(keyword);
};


module.exports = { createItService, findAllItService, updateItService, searchItService }