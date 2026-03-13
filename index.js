import { Gameboard } from "./src/Gameboard.js";
import { GameController } from "./src/GameController.js";
import { renderBoard } from "./src/UIController.js";

const game = new GameController();


renderBoard([]);


game.setupShips(game.user);
game.setupShips(game.cpu);
game.switchTurns();
// game.user.board.placeShip("carrier", [1,2])
console.log(game.currentPlayer)
