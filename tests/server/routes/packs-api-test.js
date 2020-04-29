const Collection = require("../../../src/server/db/collection");
const Users = require("../../../src/server/db/users");
const request = require('supertest');
const app = require('../../../src/server/app');

beforeEach(() => {
    Users.createInitialUsers();
});

afterEach(() => {
    Users.deleteAllUsers();
});


test("Test user can open packs", async () => {
    const agent = request.agent(app);

    let response = await agent
        .post('/api/login')
        .send({id: "andrea", password:"42"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);


    response = await agent.put("/api/packs/open")
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
});

test("Test user can't open unowned packs", async () => {
    const agent = request.agent(app);

    let response = await agent
        .post('/api/login')
        .send({id: "andrea", password:"42"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    for(let i = 0; i < 3; i++) {
        response = await agent.put("/api/packs/open")
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
    }
    response = await agent.put("/api/packs/open")
        .set("Content-Type", "application/json");
    console.log(response.body);
    expect(response.statusCode).toBe(404);
});

test("Test user can get packs", async () => {
    const agent = request.agent(app);

    let response = await agent
        .post('/api/login')
        .send({id: "andrea", password:"42"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    response = await agent.put("/api/packs/andrea")
        .set("Content-Type", "application/json");
    console.log(response.body);

});

test("Test user can buy 1 pack but not two", async () => {
    const agent = request.agent(app);

    let response = await agent
        .post('/api/login')
        .send({id: "andrea", password:"42"})
        .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(204);

    response = await agent.put("/api/packs/buy")
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    response = await agent.put("/api/packs/buy")
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
});