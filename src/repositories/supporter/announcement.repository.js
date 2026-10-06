const Announcement = require("../../model/announcement.model");
const User = require("../../model/users.model");

const AUTHOR_INCLUDE = { model: User, as: "author", attributes: { exclude: ["password"] } };

const createAnnouncement = async (data) => {
    return await Announcement.create(data);
};

const findAll = async () => {
    return await Announcement.findAll({
        include: AUTHOR_INCLUDE,
        order: [["createdAt", "DESC"]],
    });
};

const findByAuthorId = async (authorId) => {
    return await Announcement.findAll({
        where: { authorId },
        include: AUTHOR_INCLUDE,
        order: [["createdAt", "DESC"]],
    });
};

const findById = async (id) => {
    return await Announcement.findOne({ where: { id }, include: AUTHOR_INCLUDE });
};

module.exports = { createAnnouncement, findAll, findByAuthorId, findById };
