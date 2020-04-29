//This file uses data from Users file, but to maintain separation of concerns I'm doing everything that has to do with the
//user's collection here, then changing his entry in Users.

const Users = require("./users");
const Cards = require("./cards/cards");

function openPack(id, cardCount) {
    let user = Users.getUser(id);
    if(!user) {
        throw "User not found"
    }

    if(user.packs === 0) {
        throw "No packs"
    }

    let allCards = Cards.getAllCards();
    let newCards = [];

    for(let i = 0; i < cardCount; i++) {
        let shouldAdd = true;
        let card = allCards[Math.floor(Math.random() * allCards.length)];
        newCards.push(card);
        user.collection.forEach(existing => {
            if(existing.id === card.id) {
                existing.count++;
                shouldAdd = false;
            }
        });
        if(shouldAdd === true) {
            card.count = 1;
            user.collection.push(card);
        }
    }
    user.packs = user.packs -1;
    let totalCards = 0;
    user.collection.forEach(value => {
        totalCards += value.count;
    });
    user.totalCards = totalCards;

    Users.deleteUser(id);
    Users.users.set(id, user);
    return newCards;
}

function getPacks(id) {
    let user = Users.getUser(id);
    if(!user) {
        throw "User not found";
    }

    return user.packs
}

function getUserCards(id) {
    let user = Users.getUser(id);
    if(!user) {
        return false;
    }
    return user.collection
}


function millCard(id, card) {
    const user = Users.getUser(id);

    if(!user) {
        throw "User not found"
    }
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
    let cost;
    if(card.rarity === "COMMON") {
        cost = 10;
    }
    if(card.rarity === "RARE") {
        cost = 25;
    }
    if(card.rarity === "EPIC") {
        cost = 50;
    }
    if(card.rarity === "LEGENDARY") {
        cost = 100;
    }
    user.gold = user.gold + cost;
    user.totalCards = user.totalCards - 1;

    Users.deleteUser(id);
    Users.users.set(id, user);
    return true;
}

function buyPack (id) {
    const user = Users.getUser(id);
    if(!user) {
        throw "User not found"
    }
    if(user.gold < 100) {
        return false;
    }
    user.gold = user.gold - 100;
    user.packs++;
    Users.deleteUser(id);
    Users.users.set(id, user);
    return true;
}

function makeRichieRich() {
    let richie = Users.getUser("RichieRich");
    richie.packs = 250;
    richie.gold = 1000000;
    Cards.getAllCards().forEach(card => {
        card.count = 1;
        richie.totalCards += 1;
        richie.collection.push(card)
    });
}



module.exports = {openPack, getPacks, getUserCards, millCard, buyPack, makeRichieRich};
