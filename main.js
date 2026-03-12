import { GameController } from "./src/GameController.js";


const game = new GameController();
game.setupShips();
console.log(game.user.board.ships);
console.log(game.checkWinner());
