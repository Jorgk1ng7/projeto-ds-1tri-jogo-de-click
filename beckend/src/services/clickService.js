const fs = require("fs");
const path = "./src/data.json";

function readData() {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}

function saveData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function getAllPlayers() {
    return readData();
}

function createPlayer(user) {
    const data = readData();

    const newPlayer = {
        id: data.length + 1,
        user,
        totalClicks: 0
    };

    data.push(newPlayer);
    saveData(data);

    return newPlayer;
}

function clickPlayer(id) {
    const data = readData();

    const player = data.find(p => p.id == id);

    if (!player) return null;

    player.totalClicks += 1;
    saveData(data);

    return player;
}

module.exports = {
    getAllPlayers,
    createPlayer,
    clickPlayer
};