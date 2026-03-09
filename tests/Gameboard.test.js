import { Gameboard } from "../src/Gameboard";

test("gameboard stores ships", () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(3, [1, 3]);
    expect(newBoard.ships).toEqual([
        {
            ship: 3,
            coordinates: [1,3]
        }
    ])
})
