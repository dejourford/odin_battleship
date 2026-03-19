import { Gameboard } from "../src/Gameboard";
import { GameController } from "../src/GameController";
import { Ship } from "../src/Ship";

// test gameboard stores ships
test("gameboard stores ships", () => {
    const newBoard = new Gameboard();
    const ship = new Ship("test-ship", 3);

    newBoard.placeShip(ship, [["A", 3], ["A", 4], ["A", 5]]);
    expect(newBoard.ships).toEqual([
        {
            ship: ship,
            coordinates: [["A", 3], ["A", 4], ["A", 5]]
        }
    ])
})

// test gameboard throws an error instead of placing overlapping ships
test("gameboard throws an error instead of placing overlapping ships", () => {
    const newBoard = new Gameboard();
    const ship = new Ship("test-ship", 3);
    const ship2 = new Ship("test-ship", 4);

    newBoard.placeShip(ship, [["A",3], ["A",4], ["A",5]]);

    expect(() => {
        newBoard.placeShip(ship2, [["A",3], ["A",4], ["A",5], ["A",6]]);
    }).toThrow("A ship already exists here!");
});

// test gameboard receives attacks
test("gameboard receives attacks", () => {
    const newBoard = new Gameboard();
    const ship = new Ship("test-ship", 3);

    newBoard.placeShip(ship, [["A", 3], ["A", 4], ["A", 5]])
    newBoard.receiveAttack("A", 3)
    expect(ship.hits).toBe(1)
})

// test gameboard to track misses
test("gameboard tracks misses", () => {
    const newBoard = new Gameboard();

    newBoard.receiveAttack("A", 6)
    expect(newBoard.missedAttacks).toEqual([["A", 6]])
})

// test gameboard to track multiple misses
test("gameboard tracks misses", () => {
    const newBoard = new Gameboard();

    newBoard.receiveAttack("A", 6)
    newBoard.receiveAttack("A", 3)
    newBoard.receiveAttack("A", 1)
    expect(newBoard.missedAttacks).toEqual([["A", 6], ["A", 3], ["A", 1]])
})

// test gameboard checks if all ships are sunk
test("gameboard returns false if not all ships are hit", () => {
    const newBoard = new Gameboard();
    const ship = new Ship("test-ship", 3);
    newBoard.placeShip(ship, [["A", 6], ["A", 3], ["A", 1]])
    newBoard.receiveAttack("A", 6)
    newBoard.receiveAttack("A", 3)
    newBoard.receiveAttack("A", 2)
    expect(newBoard.allShipsSunk()).toEqual(false)
})

// test gameboard checks if all ships are sunk
test("gameboard returns true if all ships are hit", () => {
    const newBoard = new Gameboard();
    const ship = new Ship("test-ship", 3);
    newBoard.placeShip(ship, [["A", 6], ["A", 3], ["A", 2]])
    newBoard.receiveAttack("A", 6)
    newBoard.receiveAttack("A", 3)
    newBoard.receiveAttack("A", 2)
    expect(newBoard.allShipsSunk()).toEqual(true)
})

// test gameboard checks for user as winner
test("gameboard checks for and returns winner", () => {
    const game = new GameController();
    const ship = new Ship("test-ship", 4);
    const ship2 = new Ship("test-ship", 2);
    game.opp.board.placeShip(ship, [["A",2], ["A",3], ["A",4], ["A",5]])
    game.opp.board.placeShip(ship2, [["B",2], ["B",3]])
    game.user.attack(game.opp.board, "A", 2)
    game.user.attack(game.opp.board, "A", 3)
    game.user.attack(game.opp.board, "A", 4)
    game.user.attack(game.opp.board, "A", 5)
    game.user.attack(game.opp.board, "B", 2)
    game.user.attack(game.opp.board, "B", 3)

    expect(game.checkWinner()).toBe("user")
}) 

// test gameboard checks for cpu as winner
test("test gameboard checks for cpu as winner", () => {
    const game = new GameController();
    const ship = new Ship("test-ship", 4);
    const ship2 = new Ship("test-ship", 2);
    game.user.board.placeShip(ship, [["A", 2], ["A", 3], ["A", 4], ["A", 5]])
    game.user.board.placeShip(ship2, [["B", 2], ["B", 3]])
    game.opp.attack(game.user.board, "A", 2)
    game.opp.attack(game.user.board, "A", 3)
    game.opp.attack(game.user.board, "A", 4)
    game.opp.attack(game.user.board, "A", 5)
    game.opp.attack(game.user.board, "B", 2)
    game.opp.attack(game.user.board, "B", 3)

    expect(game.checkWinner()).toBe("opp")
})

// test gameboard checks for user as winner
test("gameboard checks for user as winner", () => {
    const game = new GameController();
    const ship = new Ship("test-ship", 4);
    const ship2 = new Ship("test-ship", 2);
    game.opp.board.placeShip(ship, [["A",2], ["A",3], ["A",4], ["A",5]])
    game.opp.board.placeShip(ship2, [["B",2], ["B",3]])
    game.user.attack(game.opp.board, "A", 2)
    game.user.attack(game.opp.board, "A", 3)
    game.user.attack(game.opp.board, "A", 4)
    game.user.attack(game.opp.board, "A", 5)
    game.user.attack(game.opp.board, "B", 2)
    game.user.attack(game.opp.board, "B", 3)

    expect(game.checkWinner()).toBe("user")
}) 

// test gameboard throws an error when a previously successful attack is attempted by the user
test("gameboard throws an error when a previously successful attack is attempted by the user", () => {
    const game = new GameController();
    const ship = new Ship("test-ship", 4);
    game.cpu.board.placeShip(ship, [["A",2], ["A",3], ["A",4], ["A",5]])
    game.user.attack(game.cpu.board, "A", 2)
    

    expect(() => {
        game.user.attack(game.cpu.board, "A", 2)
        game.cpu.board.receiveAttack()
    }).toThrow("This attack has already been made!")
})

// test gameboard throws an error when a previously successful attack is attempted by the cpu
test("gameboard throws an error when a previously successful attack is attempted by the cpu", () => {
    const game = new GameController();
    const ship = new Ship("test-ship", 4);
    game.user.board.placeShip(ship, [["A", 2], ["A", 3], ["A", 4], ["A", 5]])
    game.cpu.attack(game.user.board, "A", 2)
    

    expect(() => {
        game.cpu.attack(game.user.board, "A", 2)
        game.user.board.receiveAttack()
    }).toThrow("This attack has already been made!")
})
