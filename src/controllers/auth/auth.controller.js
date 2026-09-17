const { register, verifyEmailByOtp} = require ("../../services/auth/auth.service");
const { validateRegister } = require ("../../validations/auth/auth.validation");

const registerController = async (req, res) => {
    try {
        const { fullName, phone, email, password, confirmPass } = req.body;
        await validateRegister( {fullName, phone, email, password, confirmPass} );
        const user = await register( fullName, phone, email, password);
        return res.status(200).json({ 
            message: "Đăng ký thành công. Vui lòng check mail để nhận đường dẫn xác thực tài khoản",
            data: user,
        });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const verifyEmailByOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await verifyEmailByOtp(email, otp);
        return res.status(200).json({
            message: "Xác thực tài khoản thành công."
        });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

module.exports = { registerController, verifyEmailByOtpController };