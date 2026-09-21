const { register, verifyEmailByOtp, resendOtp, login, forgotPass, verifyResetOtp, resetPassword } = require ("../../services/auth/auth.service");
const { validateRegister, validateLogin, validateResetPass } = require ("../../validations/auth/auth.validation");

const registerController = async (req, res) => {
    try {
        const { fullName, phone, email, password, confirmPass } = req.body;
        await validateRegister( fullName, phone, email, password, confirmPass );
        const user = await register( fullName, phone, email, password);
        return res.status(201).json({ 
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
        return res.status(201).json({
            message: "Xác thực tài khoản thành công."
        });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const resendOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        await resendOtp(email);
        return res.status(201).json({
            message: "Gửi lại OTP thành công."
        });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        await validateLogin( email, password );
        const loginData = await login( email, password );
        return res.status(200).json({
            message: "Đăng nhập thành công",
            data: loginData,
        });
    } catch (error) {
        const status = error.status || 500; 
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const forgotPassController = async (req,res) => {
    try {
        const { email } = req.body;
        await forgotPass(email);
        return res.status(200).json({
            message: "Vui lòng truy cập mail để nhận mã cập nhật mật khẩu"
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const verifyResetOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await verifyResetOtp(email, otp);
        return res.status(200).json({
            message: "Xác thực OTP thành công"
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};

const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;
        await validateResetPass(email, otp, newPassword, confirmPassword);
        await resetPassword(email, otp, newPassword);
        return res.status(200).json({
            message: "Đặt lại mật khẩu thành công"
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống"});
    };
};



module.exports = { registerController, verifyEmailByOtpController, resendOtpController,
    loginController, forgotPassController, verifyResetOtpController, resetPasswordController };