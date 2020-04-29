const Cards = require("../../../src/server/db/cards/cards");

test("Test getting cards", () => {
    const cards = Cards.getAllCards();
    expect(cards.length).toBe(100);
});

test("Test getting individual card", () => {
    const card = Cards.getCard("AT_001");
    expect(card.name).toBe("Flame Lance");
})