import { Gameboard } from "./src/Gameboard.js";
import { GameController } from "./src/GameController.js";
import { renderBoard } from "./src/UIController.js";

const game = new GameController();


renderBoard(game.currentPlayer.board);


game.setupShips();
game.switchTurns();
game.switchTurns();

