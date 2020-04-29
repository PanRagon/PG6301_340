const request = require('supertest');
const app = require('../../../src/server/app');
const Collection = require("../../../src/server/db/collection");
const Users = require("../../../src/server/db/users");


test("Test opening pack with no auth", async () =>{

    const response = await request(app).put('/api/openpack');

    expect(response.statusCode).toBe(401);
});

test("Test shouldn't get other users' packs", async () => {
    const agent = request.agent(app);
    Users.createInitialUsers();
    let response = await agent
        .post('/api/login')
        .send({id: "Tomas", password:"FizzBuzz"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    response = await agent.get("/api/packs/Andrea");
    expect(response.statusCode).toBe(403);
});

test("Test shouldn't get other users' cards", async () => {
    const agent = request.agent(app);
    Users.createInitialUsers();
    let response = await agent
        .post('/api/login')
        .send({id: "Andrea", password:"42"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    response = await agent.get("/api/usercards/Tomas");
    expect(response.statusCode).toBe(403);
});

test("Test can't buy packs if not logged in", async () => {
    let response = await request(app).put("/api/buypack");
    expect(response.statusCode).toBe(401);
});

test("Test can't mill cards if not logged in", async () => {
    let fakeCard = {id: "AT_001"};
    let response = await request(app).delete("/api/mill")
        .send(JSON.stringify(fakeCard)).set("Content-Type", "application/json");
    expect(response.statusCode).toBe(401);
});