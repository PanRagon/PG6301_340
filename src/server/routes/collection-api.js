const express = require("express");
const Collection = require("../db/collection");
const Users = require("../db/users");

const router = express.Router();



router.get("/collection/:id/cards", function (req, res) {
    if(!req.body) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        )
    }

    if(req.body !== req.params["id"]) {
        res.status(403).json(
            "403: Forbidden"
        )
    }

    const cards = Collection.getUserCards(req.params["id"]);

    if(!cards) {
        res.status(404).send();
    }
    res.status(200).json(cards);
});

router.delete("/collection/:id/mill", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        )

    }

    if(req.user.id !== req.params["id"]) {
        res.status(403).json(
            "403: Forbidden"
        )
    }
    const milled = Collection.millCard(req.params["id"], req.body.cardId);
    if(!milled) {
        res.status(404).send();
    }
    res.status(200).send();
});

//This actually lists all the information, but I'm keeping it seperate from authentication to avoid some glitches
//I had when trying to mutate the logged in state.
router.get("/collection/:id", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please login"
        )
    }

    if(req.user.id !== req.params["id"]) {
        res.status(403).json(
            "403: Forbidden"
        )
    }
    const user = Users.getUser(req.params["id"]);
    //Don't want to send out the password in plaintext...
    delete user.password;
    if(!user) {
        res.status(404).send();
    }
    res.status(200).json(user);
});

module.exports = router;
