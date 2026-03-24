import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
import { renderBoard, playerPlaceShips } from "./UIController.js";

export class GameController {
    constructor(firstPlayer, secondPlayer) {
        this.user = new Player(`${firstPlayer}`);
        this.opp = new Player(`${secondPlayer}`);
        this.cpu = new Player("cpu");
        this.currentPlayer = this.user;

        this.setupShips(this.user);
        this.setupShips(this.opp);
    }



    // 1. setup chips
    setupShips(player) {
        player.shipsToPlace = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Destroyer", 3),
            new Ship("Submarine", 3),
            new Ship("Patrol Boat", 2),
        ]
    }

    // 2. switch turns

    switchTurns() {
        // switch teams
        this.currentPlayer = this.currentPlayer === this.user ? this.opp : this.user;

        // render current player board
        renderBoard(this.currentPlayer.board);
    }

    startPlacementPhase(player) {
        player.allShipsPlaced = false;
        
        renderBoard(player.board);

        playerPlaceShips(player);

        this.waitForPlacement(player);
    }

    waitForPlacement(player) {
        const observer = setInterval(() => {
            if (player.allShipsPlaced) {
                clearInterval(observer);
                this.switchTurns();

                this.startPlacementPhase(this.currentPlayer);
            }
        }, 50);
    }

    // 3. check for win condition
    checkWinner() {
        if (this.user.board.allShipsSunk()) {
            return "opp";
        }


        if (this.opp.board.allShipsSunk()) {
            return "user";
        }

        return null;
    }



}
