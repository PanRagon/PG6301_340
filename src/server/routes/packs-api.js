const express = require("express");
const Packs = require("../db/packs");
const Users = require("../db/users");

const router = express.Router();

//This and the buy pack action should only be done from the frontend service with the required user authentication.
//As such I'll be using the user's own authenticated ID for these services rather than the parameter.
router.put("/packs/open", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        );
    }

    const user = Users.getUser(req.user.id);
    const newCards = Packs.openPack(user.id, 5);
    if(!newCards) {
        res.status(404).json(
            "404: Pack not found"
        );
    }
    //We send 200 rather than 201, we didn't create a new element, merely mutated the existing user collection
    res.status(200).json(newCards);
});

router.get("/packs/:id", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        );
    }

    if(req.user.id !== req.params["id"]) {
        res.status(403).send(
            "403: Forbidden"
        );
    }

    const packs = Packs.getPacks(req.params["id"]);

    if(!packs) {
        res.status(404).send();
    }
    res.status(200).json(packs);
});

router.put("/packs/buy", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Authenticated - Please log in"
        )
    }
    const bought = Packs.buyPack(req.user.id);
    if(!bought) {
        res.status(400).json(
            "400: Bad Request - You don't have enough gold"
        )
    }
    res.status(200).send();
});

module.exports = router;