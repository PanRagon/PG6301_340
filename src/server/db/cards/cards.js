//This is JSON-representation of all the collectible cards in Blizzard's card game Hearthstone, it can be found here:
//https://hearthstonejson.com/
//I've limited the amount of cards imported here to keep the file from being unecessarily large.

let json = require("./cards.json");
json = JSON.stringify(json);
let cards = new Map();

//We're only keeping 100 cards for the sake of the UI on this project
let cardsArr = JSON.parse(json).slice(0, 100);

//Just filtering out some properties we don't need to keep it streamlined
let propertiesToRemove = ["artist", "collectible", "dbfId", "playRequirements", "set", "mechanics", "flavor"];


cardsArr.forEach((card) => {
    //dbfId is a pure numeral ID, better for this purpose as I'll be using it in the API URIs.
    card.id = card.dbfId;
    //Spells have a $ in front of them if they deal damage and # if they heal, we don't want this.
    if(card.text) {
        card.text = card.text.replace(/\$/, "");
        card.text = card.text.replace(/#/, "");
    }
    propertiesToRemove.forEach((property) => {
        delete card[property]
    });
    //delete card[dbfId];
    cards.set(card.id, card);
});


//We just return the card array here so that we can map it in the UI later.
function getAllCards() {
    return cardsArr;
}

function getCard(id) {
    return cards.get(id)
}

//Only used to verify that the API will give an error if the array is empty, this isn't actually available as an endpoint.
function deleteAllCards() {
    cardsArr = [];
}

module.exports = {getAllCards, getCard, deleteAllCards};
