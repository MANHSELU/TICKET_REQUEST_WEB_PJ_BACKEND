const bcrypt = require("bcryptjs");
const authRepository = require("../../repositories/auth/auth.repository");
const crypto = require("crypto");
const mailService = require("../../services/mail/mail.service");
const jwtConfig = require("../../configs/jwt.config");

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

const RESEND_COOLDOWN_MS = 60 * 1000; // 60 giây
const resendOtp = async (email) => {
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw { status: 404, message: "Người dùng không tồn tại" };
    }
    if (user.isActive) {
        throw { status: 400, message: "Tài khoản đã được xác thực trước đó" };
    }
    const oldOtp = await authRepository.findOtpByUserId(user.id);
    if (oldOtp) {
        const elapsed = Date.now() - new Date(oldOtp.createdAt).getTime();
        if (elapsed < RESEND_COOLDOWN_MS) {
            throw { status: 429, message: `Vui lòng chờ hết 60s trước khi gửi lại OTP` };
        }
        await authRepository.deleteOtpByUserId(user.id);
    }
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await authRepository.createOtp({ userId: user.id, otp, expiresAt });
    await mailService.sendOtpMail(email, otp);
};

const login = async (email, password) => {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw {
            status: 404,
            message: "Người dùng không tồn tại"
        };
    };
    if(user.isActive === false) {
        const oldOtp = await authRepository.findOtpByUserId(user.id);
        if(oldOtp) {
           await authRepository.deleteOtpById(oldOtp.id);
        };
        const newOtp = crypto.randomInt(100000, 1000000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Thời gian hết hạn OTP 
        await authRepository.createOtp({userId: user.id, otp: newOtp, expiresAt});
        await mailService.sendOtpMail(email, newOtp);
        throw {
            status: 400,
            message: "Người dùng chưa xác thực, vui lòng check mail để nhận mã xác thực"
        };
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw {
            status: 400,
            message: "Email hoặc mật khẩu không đúng"
        };
    };
    const accessToken = jwtConfig.generateAccessToken({ userId: user.id, role: user.role});
    const refreshToken = jwtConfig.generateRefreshToken({ userId: user.id });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await authRepository.upsertRefreshToken({ userId: user.id, token: refreshToken, expiresAt });
    return { accessToken, refreshToken };   
};

const forgotPass = async (email) => {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw {
            status: 404,
            message: "Không tìm thấy người dùng"
        };
    };
    const oldOtp = await authRepository.findOtpByUserId(user.id);
    if(oldOtp) {
        await authRepository.deleteOtpById(oldOtp.id);
    };
    const newOtp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await authRepository.createOtp({ userId: user.id, otp: newOtp, expiresAt });
    await mailService.sendOtpMail(email, newOtp);
};

const verifyResetOtp = async (email, otp) => {
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw { status: 404, message: "Không tìm thấy người dùng" };
    };
    const verification = await authRepository.findByUserIdAndOtp(user.id, otp);
    if (!verification || verification.expiresAt < new Date()) {
        throw { status: 400, message: "Mã OTP không hợp lệ" };
    };
};

const resetPassword = async (email, otp, newPassword) => {
    const user = await authRepository.findByEmail(email);
    if(!user) {
        throw {
        status: 404,
        message: "Không tìm thấy người dùng"
        };
    };
    const verification = await authRepository.findByUserIdAndOtp(user.id, otp);
    if (!verification || verification.expiresAt < new Date()) {
        throw { status: 400, message: "Mã OTP không hợp lệ" };
    };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updatePass(user.id, hashedPassword);
};


module.exports = { register, verifyEmailByOtp, resendOtp, login, forgotPass, verifyResetOtp, resetPassword };