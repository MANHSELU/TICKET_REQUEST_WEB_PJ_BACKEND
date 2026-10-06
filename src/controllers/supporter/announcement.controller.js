const { validateCreateAnnouncement } = require("../../validations/supporter/announcement.validation");
const { createAnnouncement, findAllAnnouncement, findMyAnnouncement } = require("../../services/supporter/announcement.service");

const createAnnouncementController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, content } = req.body;
        await validateCreateAnnouncement(title, content);
        const announcement = await createAnnouncement(userId, title, content, req.file);
        return res.status(201).json({ message: "Đăng thông báo thành công", data: announcement });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findAllAnnouncementController = async (req, res) => {
    try {
        const announcements = await findAllAnnouncement();
        return res.status(200).json({ message: "Lấy danh sách thông báo thành công", data: announcements });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findMyAnnouncementController = async (req, res) => {
    try {
        const { userId } = req.user;
        const announcements = await findMyAnnouncement(userId);
        return res.status(200).json({ message: "Lấy danh sách thông báo của bạn thành công", data: announcements });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createAnnouncementController, findAllAnnouncementController, findMyAnnouncementController };
