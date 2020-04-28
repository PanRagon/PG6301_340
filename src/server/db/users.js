//AuthAPI and simulated Users database based on example given in excercise solutions in web_development_and_api_design repository
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/db/users.js

const users = new Map();

function getUser(id) {
    return users.get(id);
}

function verifyUser(id, password) {
    const user = getUser(id);

    if(!user) {
        return false;
    }

    return user.password === password;
}

function createUser(id, password) {
    if(getUser(id)) {
        return false;
    }

    const user = {
        id,
        password,
        collection: []
    };

    users.set(id, user);
    return true;
}

function deleteAllUsers() {
    users.clear();
}

function deleteUser(id) {
    const user = getUser(id);

    if(!user) {
        throw "Invalid User ID: " + id;
    }

    users.delete(id);
}

//Simulate User
createUser("Andrea", "42", "27.09.1989");
createUser("Tomas", "FizzBuzz", "27.04.1987");

module.exports = {getUser, verifyUser, createUser, deleteAllUsers, deleteUser, users};