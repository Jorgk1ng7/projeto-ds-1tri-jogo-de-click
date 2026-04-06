const express = require("express");
const router = express.Router();

// "Banco de dados fake"
let clicks = [];

// 📌 GET todos os jogadores
router.get("/", (req, res) => {
    res.json(clicks);
});

// 📌 GET jogador por ID
router.get("/:id", (req, res) => {
    const player = clicks.find(p => p.id == req.params.id);

    if (!player) {
        return res.status(404).json({ error: "Jogador não encontrado" });
    }

    res.json(player);
});

// 📌 POST criar jogador
router.post("/", (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const newPlayer = {
        id: clicks.length + 1,
        user: user,
        totalClicks: 0
    };

    clicks.push(newPlayer);

    res.status(201).json(newPlayer);
});

// 📌 PUT clicar (aqui é o jogo acontecendo)
router.put("/:id/click", (req, res) => {
    const player = clicks.find(p => p.id == req.params.id);

    if (!player) {
        return res.status(404).json({ error: "Jogador não encontrado" });
    }

    player.totalClicks += 1;

    res.json({
        message: "Click registrado!",
        totalClicks: player.totalClicks
    });
});

// 📌 DELETE jogador
router.delete("/:id", (req, res) => {
    clicks = clicks.filter(p => p.id != req.params.id);

    res.json({ message: "Jogador removido" });
});

module.exports = router;