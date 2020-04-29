
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

//We're not actually using this on the frontend, but it's best practice to have an endpoint to get individual items when
//you have one that gets a list of them.
router.get("/cards/:id", function (req, res) {
    const card = Cards.getCard(req.params.get["id"]);

    if(!card) {
        res.status(404).json(
            "404 - Card Not Found"
        )
    }

    res.status(200).json(card);
});

module.exports = router;