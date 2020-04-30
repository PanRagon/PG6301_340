const Users = require("./users");
const Cards = require("./cards/cards");

function openPack(id, cardCount) {
    let user = Users.getUser(id);
    if(!user) {
        throw "User not found"
    }

    if(user.packs === 0) {
        return false;
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

    return newCards;
}

function getPacks(id) {
    let user = Users.getUser(id);
    if(!user) {
        throw "User not found";
    }

    return user.packs
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
    return true;
}

module.exports = {openPack, getPacks, buyPack};