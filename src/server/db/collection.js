//This file uses data from Users file, but to maintain separation of concerns I'm doing everything that has to do with the
//user's collection here, then changing his entry in Users.

const Users = require("./users");
const Cards = require("./cards/cards");

function getUserCards(id) {
    let user = Users.getUser(id);
    if(!user) {
        return false;
    }
    return user.collection
}


function millCard(id, cardId) {
    const user = Users.getUser(id);
    const card = Cards.getCard(cardId);

    let exists = false;
    user.collection.forEach((value, index) => {
        if(value.id === card.id) {
            exists = true;
            if(value.count > 1) {
                value.count--;
            } else {
                user.collection.splice(index, 1);
            }
        }
    });

    if(!exists) {
        throw "Can't find card";
    }
    let value;
    if(card.rarity === "COMMON") {
        value = 10;
    }
    if(card.rarity === "RARE") {
        value = 25;
    }
    if(card.rarity === "EPIC") {
        value = 50;
    }
    if(card.rarity === "LEGENDARY") {
        value = 100;
    }
    user.gold = user.gold + value;
    user.totalCards = user.totalCards - 1;
    return true;
}

function buyCard(id, cardId) {
    const user = Users.getUser(id);
    const card = Cards.getCard(cardId);

    if(!card) {
        return false;
    }
    let cost;
    if(card.rarity === "COMMON") {
        cost = 20;
    }
    if(card.rarity === "RARE") {
        cost = 50;
    }
    if(card.rarity === "EPIC") {
        cost = 100;
    }
    if(card.rarity === "LEGENDARY") {
        cost = 200;
    }

    if(user.gold < cost) {
        return false;
    }

    user.gold = user.gold - cost;
    let foundCard = false;
    user.collection.forEach(value => {
        if(cardId === value.id) {
            foundCard = true;
            value.count++;
        }
        }
    );
    if(!foundCard) {
        card.count = 1;
        user.collection.push(card);
    }
    user.totalCards++;
    return true;
}

function makeRichieRich() {
    let richie = Users.getUser("richie_rich");
    richie.packs = 250;
    richie.gold = 1000000;
    Cards.getAllCards().forEach(card => {
        card.count = 1;
        richie.totalCards += 1;
        richie.collection.push(card)
    });
}

module.exports = {getUserCards, millCard, buyCard, makeRichieRich};
