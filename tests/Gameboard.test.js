import { Gameboard } from "../src/Gameboard";
import { GameController } from "../src/GameController";
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

// test gameboard checks for user as winner
test("gameboard checks for and returns winner", () => {
    const game = new GameController();
    const ship = new Ship(4);
    const ship2 = new Ship(2);
    game.cpu.board.placeShip(ship, [[1,2], [2,3], [1,4], [1,5]])
    game.cpu.board.placeShip(ship2, [[2,2], [3,3]])
    game.user.attack(game.cpu.board, 1, 2)
    game.user.attack(game.cpu.board, 2, 3)
    game.user.attack(game.cpu.board, 1, 4)
    game.user.attack(game.cpu.board, 1, 5)
    game.user.attack(game.cpu.board, 2, 2)
    game.user.attack(game.cpu.board, 3, 3)

    expect(game.checkWinner()).toBe("user")
}) 

// test gameboard checks for cpu as winner
test("gameboard checks for and returns winner", () => {
    const game = new GameController();
    const ship = new Ship(4);
    const ship2 = new Ship(2);
    game.user.board.placeShip(ship, [[1,2], [2,3], [1,4], [1,5]])
    game.user.board.placeShip(ship2, [[2,2], [3,3]])
    game.cpu.attack(game.user.board, 1, 2)
    game.cpu.attack(game.user.board, 2, 3)
    game.cpu.attack(game.user.board, 1, 4)
    game.cpu.attack(game.user.board, 1, 5)
    game.cpu.attack(game.user.board, 2, 2)
    game.cpu.attack(game.user.board, 3, 3)

    expect(game.checkWinner()).toBe("cpu")
})

// test gameboard checks for user as winner
test("gameboard checks for and returns winner", () => {
    const game = new GameController();
    const ship = new Ship(4);
    const ship2 = new Ship(2);
    game.cpu.board.placeShip(ship, [[1,2], [2,3], [1,4], [1,5]])
    game.cpu.board.placeShip(ship2, [[2,2], [3,3]])
    game.user.attack(game.cpu.board, 1, 2)
    game.user.attack(game.cpu.board, 2, 3)
    game.user.attack(game.cpu.board, 1, 4)
    game.user.attack(game.cpu.board, 1, 5)
    game.user.attack(game.cpu.board, 2, 2)
    game.user.attack(game.cpu.board, 3, 3)

    expect(game.checkWinner()).toBe("user")
}) 

// test gameboard throws an error when a previously successful attack is attempted
test("gameboard checks for and returns winner", () => {
    const game = new GameController();
    const ship = new Ship(4);
    game.cpu.board.placeShip(ship, [[1,2], [2,3], [1,4], [1,5]])
    game.user.attack(game.cpu.board, 1, 2)
    

    expect(() => {
        game.user.attack(game.cpu.board, 1, 2)
        game.cpu.board.receiveAttack()
    }).toThrow("This attack has already been made!")
})
