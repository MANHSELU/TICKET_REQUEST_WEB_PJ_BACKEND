const ALLOWED_EMAIL_DOMAIN = require("../../constants/email.constant");

const validateRegister = async (fullName, phone, email, password, confirmPass) => {
    if( !fullName || !phone || !email || !password || !confirmPass ) {
        throw {
            status: 404,
            message: "Vui lòng không được để trống các trường"
        };
    };
    if (!email.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)) {
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
    if(!(confirmPass === password)) {
        throw {
            status: 400,
            message: "Mật khẩu xác nhận không khớp, vui lòng thử lại"
        };
    };
};

const validateLogin = async (email, password ) => {
    if(!email || !password ) {
        throw {
            status: 400,
            message: "Vui lòng nhập đầy đủ email và mật khẩu"
        };
    };
};

module.exports = { validateRegister, validateLogin };
