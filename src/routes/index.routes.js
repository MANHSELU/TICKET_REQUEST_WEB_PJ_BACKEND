const authRoutes = require("../routes/auth/auth.routes");

module.exports = [
    {
        prefix: "/api/auth",
        router: authRoutes,
    },
];
