const authRoutes = require("../routes/auth/auth.routes");
const commonRoute = require("../routes/common/profileManagement.routes");
const { authenticate } = require("../middlewares/auth.middleware");

module.exports = [
    {
        prefix: "/api/auth",
        router: authRoutes,
    },
    {
        prefix: "/api/common",
        middlewares: [authenticate],
        router: commonRoute,
    },
];
