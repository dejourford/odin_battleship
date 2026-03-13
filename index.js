import { Gameboard } from "./src/Gameboard.js";
import { GameController } from "./src/GameController.js";
import { renderBoard } from "./src/UIController.js";

const game = new GameController();


renderBoard([]);


game.setupShips();
game.switchTurns();
console.log(game.currentPlayer)

