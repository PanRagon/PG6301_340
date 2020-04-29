import Home from "../../src/client/Home";

const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
const request = require('supertest');

const { overrideFetch, asyncCheckCondition } = require('../mytest-utils');
const app = require('../../src/server/app');

test("Test should render cards from API", async () => {
    const response = await request(app)
        .get("/api/cards");
    expect(response.statusCode).toBe(200);
    const cards = response.body;

    const driver = mount(
        <MemoryRouter>
            <Home cards={cards}/>
        </MemoryRouter>
    );

    const cardElements = driver.find(".card-name");

    expect(cardElements.length).toBeGreaterThan(50)
});