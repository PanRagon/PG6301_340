
const express = require("express");
const Collection = require("../db/collection");

const router = express.Router();

router.put("/openpack", function (req, res) {
    const newCards = Collection.openPack(req.body.id, 3);
    console.log(newCards);
    if(newCards === "User not found") {
        res.status(404).send();
    }
    if(newCards === "No packs") {
        res.status(400).send();
    }
    //We send 200 rather than 201, we didn't create a new element, merely mutated the existing user collection
    res.status(200).json(newCards);
});

router.get("/packs/:id", function (req, res) {
    const packs = Collection.getPacks(req.params["id"]);

    if(!packs) {
        res.status(404).send();
    }
    res.status(200).json(packs);
});

module.exports = router;
