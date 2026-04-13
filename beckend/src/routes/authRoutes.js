const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.json({ message: "Registro ok" });
});

router.post("/login", (req, res) => {
    res.json({ message: "Login ok" });
});

module.exports = router;    