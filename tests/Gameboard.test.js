import { Gameboard } from "../src/Gameboard";
import { Ship } from "../src/Ship";

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
