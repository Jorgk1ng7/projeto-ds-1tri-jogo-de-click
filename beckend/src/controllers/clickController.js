const service = require("../services/clickService");

function getPlayers(req, res) {
    res.json(service.getAllPlayers());
}

function createPlayer(req, res) {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ error: "Nome obrigatório" });
    }

    const player = service.createPlayer(user);
    res.status(201).json(player);
}

function clickPlayer(req, res) {
    const player = service.clickPlayer(req.params.id);

    if (!player) {
        return res.status(404).json({ error: "Não encontrado" });
    }

    res.json(player);
}

module.exports = {
    getPlayers,
    createPlayer,
    clickPlayer
};