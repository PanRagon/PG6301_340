const Users = require("../../../src/server/db/users");


test("Initial Users should exist", () => {
    Users.createInitialUsers();
    let richie = Users.getUser("RichieRich");
    let tomas = Users.getUser("Tomas");
    let andrea = Users.getUser("Andrea");
    expect(richie.id).toBe("RichieRich");
    expect(tomas.id).toBe("Tomas");
    expect(andrea.id).toBe("Andrea");
});