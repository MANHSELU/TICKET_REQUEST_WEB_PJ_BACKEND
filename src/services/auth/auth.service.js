const bcrypt = require("bcryptjs");
const authRepository = require("../../repositories/auth/auth.repository");
const crypto = require("crypto");
const mailService = require("../../services/mail/mail.service");

const register = async (fullName, phone, email, password) => {
    const user = await authRepository.findByEmail(email);
    if(user){
        throw { 
            status: 400,
            message: "Email đã được đăng kí trước đó. Vui lòng đăng nhập",
        };
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepository.createUser({
        fullName,
        phone,
        email,
        password: hashedPassword,        
        isActive: false,
    });
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Thời gian hết hạn OTP 
    await authRepository.createOtp({
        userId: newUser.id,
        otp,
        expiresAt,
    });
    await mailService.sendOtpMail(email,otp);
    const userData = newUser.toJSON();
    delete userData.password;
    return userData;
};

const verifyEmailByOtp = async (email, otp) => {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw {
            status: 404,
            message: "Người dùng không tồn tại"
        };
    };
    const verification = await authRepository.findByUserIdAndOtp(user.id, otp);
    if(!verification || verification.expiresAt < new Date()) {
        throw {
            status: 400,
            message: "Mã OTP không hợp lệ"
        };
    };
    await authRepository.activeUser(user.id);
    await authRepository.deleteOtpById(verification.id);    
};

const resendOtp = async (email) => {
    
}
module.exports = { register, verifyEmailByOtp};