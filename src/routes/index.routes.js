const authRoutes = require("../routes/auth/auth.routes");
const commonRoute = require("../routes/common/profileManagement.routes");
const adminRoute = require("./admin/admin.routes");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");
const ROLE = require("../constants/role.constant");

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
    {
        prefix: "/api/admin",
        middlewares: [authenticate, authorizeRoles(ROLE.ADMIN)],
        router: adminRoute,
    },
];
