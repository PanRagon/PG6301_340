//This file uses data from Users file, but to maintain separation of concerns I'm doing everything that has to do with the
//user's collection here, then changing his entry in Users.

const Users = require("./users");
const Cards = require("./cards/cards");

function openPack(id, cardCount) {
    let user = Users.getUser(id);
    if(!user) {
        return "User not found"
    }

    if(user.packs === 0) {
        return "No packs"
    }

    let allCards = Cards.getAllCards();
    let newCards = [];

    for(let i = 0; i < cardCount; i++) {
        let shouldAdd = true;
        let card = allCards[Math.floor(Math.random() * allCards.length)];
        console.log(card);
        newCards.push(card);
        user.collection.forEach(existing => {
            if(existing.id === card.id) {
                existing.count++;
                shouldAdd = false;
            }
        });
        if(shouldAdd === true) {
            user.collection.push(card);
        }
    }
    user.packs = user.packs -1;

    Users.deleteUser(id);
    Users.users.set(id, user);
    return newCards;
}

function getPacks(id) {
    let user = Users.getUser(id);
    if(!user) {
        return false;
    }

    return user.packs
}

console.log(getPacks("Andrea"));
console.log(openPack("Andrea", 5));
console.log(getPacks("Andrea"));

module.exports = {openPack, getPacks};
