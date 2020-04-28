
const express = require("express");
const passport = require("passport");

const Cards = require("../db/cards/cards");

const router = express.Router();

router.get("/cards", function (req, res) {
    const cards = Cards.getAllCards();
    res.status(200).json(cards)
});

module.exports = router;