const ALLOWED_EMAIL_DOMAIN = require("../../constants/email.constant");

const validateCreateUser = (fullName, phone, email, password, confirmPassword, role) => {
    if(!fullName || !phone || !email || !password || !confirmPassword || !role) {
        throw{
            status: 404,
            message: "Các trường thông tin là bắt buộc"
        };
    };
     if(!email.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)) {
        throw {
            status: 400,
            message: `Chỉ email @${ALLOWED_EMAIL_DOMAIN} mới được phép đăng kí vào hệ thống`
        };
    };
    if(password.length < 8) {
        throw {
            status: 400,
            message: "Mật khẩu phải có ít nhất 8 kí tự"
        };
    };
    const specialRegex = /[!@#$%^&*()<>?":{}|<>]/
    if(!specialRegex.test(password)) {
        throw {
            status: 400,
            message: "Mật khẩu phải có ít nhất kí tự đặc biệt"
        }
    }
    if(!(confirmPassword === password)) {
        throw {
            status: 400,
            message: "Mật khẩu xác nhận không khớp, vui lòng thử lại"
        };
    };
};

const validateUpdateUserStatus = (userId, isActive) => {
    if (!userId || typeof isActive !== "boolean") {
        throw {
            status: 400,
            message: "Thiếu thông tin hoặc trạng thái không hợp lệ"
        };
    };
};

module.exports = { validateCreateUser, validateUpdateUserStatus }