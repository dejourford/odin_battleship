import { Player } from "../src/Player";

// test whether Player class creates player correctly
test("Player class creates player correctly", () => {
    const user = new Player("user");

    expect(user.type).toBe("user");
    expect(user.board).toBeDefined();
});
