const express = require("express");
const Collection = require("../db/collection");
const Users = require("../db/users");

const router = express.Router();

router.put("/openpack", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        );
    }

    const user = Users.getUser(req.user.id);
    const newCards = Collection.openPack(user.id, 5);
    if(!newCards) {
        res.status(400).send();
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

    const packs = Collection.getPacks(req.params["id"]);

    if(!packs) {
        res.status(404).send();
    }
    res.status(200).json(packs);
});

router.get("/usercards/:id", function (req, res) {
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

router.delete("/mill", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Unauthenticated - Please log in"
        )

    }

    //We're explicitly deleting from the authenticated users account, not an account he himself has requested,
    //No authorization needed.
    const milled = Collection.millCard(req.user.id, req.body.card);
    if(!milled) {
        res.status(404).send();
    }
    res.status(200).send();
});

router.put("/buypack", function (req, res) {
    if(!req.user) {
        res.status(401).json(
            "401: Authenticated - Please log in"
        )
    }
    const bought = Collection.buyPack(req.user.id);
    if(!bought) {
        res.status(400).json(
            "400: Bad Request - You don't have enough gold"
        )
    }
    res.status(200).send();
});

router.get("/usercollection/:id", function (req, res) {
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
    console.log(user);
    res.status(200).json(user);
});

module.exports = router;
