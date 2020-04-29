const request = require('supertest');
const app = require('../../../src/server/app');
const Cards = require("../../../src/server/db/cards/cards");

test("Test getting cards", async () => {
    const response = await request(app)
        .get("/api/cards");
    expect(response.statusCode).toBe(200);
});

test("Test getting individual card", async () => {

    const response = await request(app)
        .get("/api/card/AT_001");
    expect(response.statusCode).toBe(200);
});

test("Test getting individual card", async () => {

    const response = await request(app)
        .get("/api/card/thisisarandomstringihopetheresnocardhere");
    expect(response.statusCode).toBe(200);
});

test("Test can't get cards if none exist", async () => {
    Cards.deleteAllCards();
    let response = await request(app)
        .get("/api/cards");
    expect(response.statusCode).toBe(500);
});