const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
    res.send("API do jogo de click funcionando 🚀");
});

// importar rotas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const clickRoutes = require("./routes/clickRoutes");

// usar rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/clicks", clickRoutes);

module.exports = app;