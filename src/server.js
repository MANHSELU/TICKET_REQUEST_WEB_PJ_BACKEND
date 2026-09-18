const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./configs/database.config");
const routes = require("./routes/index.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

routes.forEach(({ prefix, middlewares = [], router }) => {
    app.use(prefix, ...middlewares, router);
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL:");
        console.error(error);
    }
};

startServer();