const announcementRepository = require("../../repositories/supporter/announcement.repository");
const { uploadAnnouncementImage } = require("../upload/uploadImg.service");

const createAnnouncement = async (authorId, title, content, file) => {
    let imageUrl = null;
    if (file) {
        imageUrl = await uploadAnnouncementImage(file.buffer);
    };
    return await announcementRepository.createAnnouncement({ authorId, title, content, imageUrl });
};

const findAllAnnouncement = async () => {
    return await announcementRepository.findAll();
};

const findMyAnnouncement = async (authorId) => {
    return await announcementRepository.findByAuthorId(authorId);
};

module.exports = { createAnnouncement, findAllAnnouncement, findMyAnnouncement };
