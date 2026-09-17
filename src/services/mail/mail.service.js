const transporter = require("../../configs/gmail.config");

const sendOtpMail = async (toEmail, otp) => {
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: "Mã xác thực tài khoản",
        html: `<p>Mã OTP của bạn là: <b>${otp}</b>. Mã có hiệu lực trong 5 phút.</p>`,
    });
};

module.exports = { sendOtpMail };
