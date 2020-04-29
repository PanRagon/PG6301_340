const Users = require("../../../src/server/db/users");


test("Initial Users should exist", () => {
    Users.createInitialUsers();
    let richie = Users.getUser("richie_rich");
    let tomas = Users.getUser("tomas");
    let andrea = Users.getUser("andrea");
    expect(richie.id).toBe("richie_rich");
    expect(tomas.id).toBe("tomas");
    expect(andrea.id).toBe("andrea");
});