import { Player } from "../src/Player";

// test whether Player class creates player correctly
test("Player class creates player correctly", () => {
    const user = new Player("user");

    expect(user.type).toBe("user");
    expect(user.board).toBeDefined();
});

// test whether Player class creates cpu correctly
test("Player class creates player correctly", () => {
    const user = new Player("cpu");

    expect(user.type).toBe("cpu");
    expect(user.board).toBeDefined();
});

// test whether player can attack cpu board
test("Player can attack cpu board", () => {
    const user = new Player("user");
    const cpu = new Player("cpu")

    user.attack(cpu.board, 3, 4);

    expect(cpu.board.missedAttacks).toContainEqual([3,4]);
})

// test whether player can attack another player board
test("Player can attack user board", () => {
    const user = new Player("user");
    const user2 = new Player("user")

    user.attack(user2.board, 3, 4);

    expect(user2.board.missedAttacks).toContainEqual([3,4]);
})
