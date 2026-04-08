const express = require("express");
const router = express.Router();
const fs = require("fs");

const filePath = "./src/data.json";

// função pra ler
function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// função pra salvar
function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET
router.get("/", (req, res) => {
    const data = readData();
    res.json(data);
});

// POST
router.post("/", (req, res) => {
    const data = readData();

    const newPlayer = {
        id: data.length + 1,
        user: req.body.user,
        totalClicks: 0
    };

    data.push(newPlayer);
    saveData(data);

    res.status(201).json(newPlayer);
});

// CLICK
router.put("/:id/click", (req, res) => {
    const data = readData();

    const player = data.find(p => p.id == req.params.id);

    if (!player) {
        return res.status(404).json({ error: "Não encontrado" });
    }

    player.totalClicks += 1;

    saveData(data);

    res.json(player);
});

module.exports = router;