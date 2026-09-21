const validateChangePass = async (userId, oldPassword, newPassword, confirmPassword) => {
    if(!userId || !oldPassword || !newPassword || !confirmPassword) {
        throw {
            status: 404,
            message: "Các trường thông tin là bắt buộc"
        };
    };
    if(newPassword.length < 8) {
        throw {
            status: 400,
            message: "Mật khẩu phải có ít nhất 8 kí tự"
        };
    };
    const specialRegex = /[!@#$%^&*()<>?":{}|<>]/
    if(!specialRegex.test(newPassword)) {
        throw {
            status: 400,
            message: "Mật khẩu phải có ít nhất kí tự đặc biệt"
        }
    };
    if(!(newPassword === confirmPassword)) {
        throw {
            status: 404,
            message: "Mật khẩu xác nhận không khớp, vui lòng thử lại"
        };
    };
};

const validateViewProfile = async (userId) => {
    if(!userId) {
        throw {
            status: 404,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateUpdateProfile = async (userId, fullName, phone, fileBuffer) => {
    if(!userId || !fullName || !phone || !fileBuffer) {
        throw {
            status: 404,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

module.exports = { validateChangePass, validateViewProfile, validateUpdateProfile }