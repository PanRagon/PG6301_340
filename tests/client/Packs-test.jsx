import Packs from "../../src/client/Packs";
import Users from "../../src/server/db/users";
import Cards from "../../src/server/db/cards/cards";
import CollectionDB from "../../src/server/db/collection";

const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
const request = require('supertest');

const { overrideFetch, asyncCheckCondition } = require('../mytest-utils');
const app = require('../../src/server/app');

beforeEach(() => {
    Users.createInitialUsers();
});

test("Test should show user's packs", async () => {
    let user = Users.getUser("andrea");
    const driver = mount(
        <MemoryRouter>
        <Packs user={user.id} userDetails={user}/>
    </MemoryRouter>
    );

    expect(driver.html().includes(user.packs)).toBe(true);
});

test("Test should render not logged in", async () => {
    const driver = mount(
        <MemoryRouter>
            <Packs />
        </MemoryRouter>
    );
    const text = "You need to login to see your packs!"
    expect(driver.html().includes(text)).toBe(true);
})