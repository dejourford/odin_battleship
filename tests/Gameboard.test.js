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
            coordinates: [[1,3], [1, 4], [4, 5]]
        }
    ])
})

// test gameboard receives attacks
test("gameboard receives attacks", () => {
    const newBoard = new Gameboard();
    const ship = new Ship(3);

    newBoard.placeShip(ship, [[1, 3], [1, 4], [1, 5]])
    newBoard.receiveAttack(1,3)
    expect(ship.hits).toBe(1)
})

// test gameboard to track misses
test("gameboard tracks misses", () => {
    const newBoard = new Gameboard();
   
    newBoard.receiveAttack(1,6)
    expect(newBoard.missedAttacks).toEqual([[1, 6]])
})
