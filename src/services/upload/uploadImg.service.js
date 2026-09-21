const cloudinary = require("../../configs/cloudinary.config");

const uploadAvatar = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "IT_SUPPORT_PJ" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

module.exports = { uploadAvatar };
