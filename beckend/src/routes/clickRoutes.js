const express = require("express");
const router = express.Router();
const controller = require("../controllers/clickController");

router.get("/", controller.getPlayers);
router.post("/", controller.createPlayer);
router.put("/:id/click", controller.clickPlayer);

module.exports = router;