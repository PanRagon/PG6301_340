const Cards = require("../../../src/server/db/cards/cards");

test("Test getting cards", () => {
    const cards = Cards.getAllCards();
    expect(cards.length).toBe(100);
});