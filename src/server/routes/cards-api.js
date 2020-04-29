
const express = require("express");

const Cards = require("../db/cards/cards");

const router = express.Router();

//Shows all cards on the frontpage, this endpoint is open for all users.
router.get("/cards", function (req, res) {
    const cards = Cards.getAllCards();

    //If there are no cards to serve the user, we've probably messed up. 500 makes most sense here.
    if(!cards) {
        res.status(500).send();
    }

    res.status(200).json(cards)
});

module.exports = router;