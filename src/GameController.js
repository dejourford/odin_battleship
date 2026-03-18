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
        player.board.placeShip(carrier, [["A", 1], ["A", 2], ["A", 3], ["A", 4], ["A", 5]]);
        player.board.placeShip(battleship, [["B", 1], ["B", 2], ["B", 3], ["B", 4]]);
        player.board.placeShip(destroyer, [["C", 1], ["C", 2], ["C", 3]]);
        player.board.placeShip(submarine, [["D", 1], ["D", 2], ["D", 3]]);
        player.board.placeShip(patrolBoat, [["E", 1], ["E", 2]]);
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
