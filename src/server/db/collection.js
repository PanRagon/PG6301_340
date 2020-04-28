//This file uses data from Users file, but to maintain separation of concerns I'm doing everything that has to do with the
//user's collection here, then changing his entry in Users.

const Users = require("./users");

function addToCollection(id, cards) {
    let user = Users.getUser(id);

    /*for(let i = 0; i < cards.length; i++) {
        user.collection.push(cards[i]);
    }*/

    Users.deleteUser(id);
    Users.users.set(id, user);
}

console.log(Users.users);
console.log(addToCollection("Andrea"));
console.log(Users.users);