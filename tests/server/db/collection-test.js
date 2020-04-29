const Collection = require("../../../src/server/db/collection");
const Users = require("../../../src/server/db/users");


test("Test Richie should be rich", () => {
    Users.createInitialUsers();
    Collection.makeRichieRich();
    let richie = Users.getUser("RichieRich");
    expect(richie.packs).toBe(250);
    expect(richie.collection.length).toBe(100);
    expect(richie.gold).toBe(1000000);
})