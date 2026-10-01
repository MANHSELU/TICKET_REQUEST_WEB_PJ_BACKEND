const authRoutes = require("../routes/auth/auth.routes");
const commonRoute = require("../routes/common/profileManagement.routes");
const adminRoute = require("./admin/admin.routes");
const requesterRoute = require("./requester/ticketRequest.routes");
const supporterRoute = require("./supporter/ticketManagement.routes");
const headSupporterRoute = require("./headSupporter/ticketManagement.routes");
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
    {
        prefix: "/api/requester",
        middlewares: [authenticate, authorizeRoles(ROLE.REQUESTER)],
        router: requesterRoute,
    },
    {
        prefix: "/api/supporter",
        middlewares: [authenticate, authorizeRoles(ROLE.SUPPORTER, ROLE.HEAD_SUPPORTER)],
        router: supporterRoute,
    },
    {
        prefix: "/api/head-supporter",
        middlewares: [authenticate, authorizeRoles(ROLE.HEAD_SUPPORTER)],
        router: headSupporterRoute,
    },
];
