const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./configs/database.config");
const routes = require("./routes/index.routes");
const setupSocket = require("./controllers/socket/socket.controller");
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});
setupSocket(io);

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

routes.forEach(({ prefix, middlewares = [], router }) => {
    app.use(prefix, ...middlewares, router);
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL:");
        console.error(error);
    };
};

startServer();
