const jwtConfig = require("../configs/jwt.config");


const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("token : ", authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Chưa đăng nhập"});
    };
    const token = authHeader.split(" ")[1]; // Tách đúng theo khoảng trắng
    try {
        const decoded = jwtConfig.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = { authenticate };
