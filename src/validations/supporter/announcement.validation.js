const validateCreateAnnouncement = (title, content) => {
    if (!title || !title.trim()) {
        throw { status: 400, message: "Vui lòng nhập tiêu đề thông báo" };
    };
    if (!content || !content.trim()) {
        throw { status: 400, message: "Vui lòng nhập nội dung thông báo" };
    };
};

module.exports = { validateCreateAnnouncement };
