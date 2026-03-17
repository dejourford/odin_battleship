import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
import { renderBoard } from "./UIController.js";

export class GameController {
    constructor(firstPlayer, secondPlayer) {
        this.user = new Player(`"${firstPlayer}"`);
        this.opp = new Player(`"${secondPlayer}"`);
        this.cpu = new Player("cpu");
        this.currentPlayer = this.user;
    }

    

    // 1. setup chips
    setupShips(player) {
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)

        console.log(player)
        player.board.placeShip(carrier, [[0,0],[0,1],[0,2],[0,3],[0,4]]);
        player.board.placeShip(battleship, [[2,0],[2,1],[2,2],[2,3]]);
        player.board.placeShip(destroyer, [[4,0],[4,1],[4,2]]);
        player.board.placeShip(submarine, [[6,0],[6,1],[6,2]]);
        player.board.placeShip(patrolBoat, [[8,0],[8,1]]);
    }

    // 2. switch turns
    
    switchTurns() {
        // switch teams
        this.currentPlayer = this.currentPlayer === this.user ? this.opp : this.user;

        // render current player board
        renderBoard(this.currentPlayer.board);
    }

    // 3. check for win condition
    checkWinner() {
        if (this.user.board.allShipsSunk()) {
            return "cpu";
        }


        if (this.opp.board.allShipsSunk()) {
            return "user";
        }

        return null;
    }



}
