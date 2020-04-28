
const express = require("express");

const Cards = require("../db/cards/cards");

const router = express.Router();

router.get("/cards", function (req, res) {
    const cards = Cards.getAllCards();

    //TODO
    if(!cards) {
        res.status(404).send();
    }

    res.status(200).json(cards)
});

module.exports = router;