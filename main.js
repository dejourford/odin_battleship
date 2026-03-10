import { GameController } from "./src/GameController.js";
import { Ship } from "./src/Ship.js";


const game = new GameController();

console.log(game.user.board);
const ship = new Ship(4);
const ship2 = new Ship(2);
game.cpu.board.placeShip(ship, [[1,2], [2,3], [1,4], [1,5]])
game.cpu.board.placeShip(ship2, [[2,2], [3,3]])
game.user.attack(game.cpu.board, 1, 2)
game.user.attack(game.cpu.board, 2, 3)
game.user.attack(game.cpu.board, 1, 4)
game.user.attack(game.cpu.board, 1, 5)

// console.log(game.cpu.board);
console.log(game.cpu.board);
console.log(game.currentPlayer)
console.log(game.checkWinner());
