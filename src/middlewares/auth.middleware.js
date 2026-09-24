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

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        const combinedAllowed = allowedRoles.reduce((acc, role) => acc | role, 0);
        if ((userRole & combinedAllowed) === 0) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập chức năng này" });
        };
        next();
    };
};

module.exports = { authenticate, authorizeRoles };
