import { Gameboard } from "../src/Gameboard";
import { Ship } from "../src/Ship";

// test gameboard stores ships
test("gameboard stores ships", () => {
    const newBoard = new Gameboard();
    const ship = new Ship(3);

    newBoard.placeShip(ship, [[1, 3], [1, 4], [4, 5]]);
    expect(newBoard.ships).toEqual([
        {
            ship: ship,
            coordinates: [[1, 3], [1, 4], [4, 5]]
        }
    ])
})

// test gameboard receives attacks
test("gameboard receives attacks", () => {
    const newBoard = new Gameboard();
    const ship = new Ship(3);

    newBoard.placeShip(ship, [[1, 3], [1, 4], [1, 5]])
    newBoard.receiveAttack(1, 3)
    expect(ship.hits).toBe(1)
})

// test gameboard to track misses
test("gameboard tracks misses", () => {
    const newBoard = new Gameboard();

    newBoard.receiveAttack(1, 6)
    expect(newBoard.missedAttacks).toEqual([[1, 6]])
})

// test gameboard to track multiple misses
test("gameboard tracks misses", () => {
    const newBoard = new Gameboard();

    newBoard.receiveAttack(1, 6)
    newBoard.receiveAttack(2, 3)
    newBoard.receiveAttack(3, 1)
    expect(newBoard.missedAttacks).toEqual([[1, 6], [2, 3], [3, 1]])
})

// test gameboard checks if all ships are sunk
test("gameboard returns false if not all ships are hit", () => {
    const newBoard = new Gameboard();
    const ship = new Ship(3);
    newBoard.placeShip(ship, [[1, 6], [1, 3], [1, 1]])
    newBoard.receiveAttack(1, 6)
    newBoard.receiveAttack(1, 3)
    newBoard.receiveAttack(1, 2)
    expect(newBoard.allShipsSunk()).toEqual(false)
})

// test gameboard checks if all ships are sunk
test("gameboard returns true if all ships are hit", () => {
    const newBoard = new Gameboard();
    const ship = new Ship(3);
    newBoard.placeShip(ship, [[1, 6], [1, 3], [1, 2]])
    newBoard.receiveAttack(1, 6)
    newBoard.receiveAttack(1, 3)
    newBoard.receiveAttack(1, 2)
    expect(newBoard.allShipsSunk()).toEqual(true)
})
