import { GameController } from "./src/GameController.js";
import { Ship } from "./src/Ship.js";

const game = new GameController();

console.log(game.user.board);
const ship = new Ship(4);
game.user.attack(game.cpu.board, 1, 2)
game.user.attack(game.cpu.board, 2, 3)
// console.log(game.cpu.board);
console.log(game.cpu.board);
