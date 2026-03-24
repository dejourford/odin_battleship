import { Player } from "./Player.js";
import { Ship } from "./Ship.js";

export class GameController {
    constructor(firstPlayer, secondPlayer) {
        this.user = new Player(firstPlayer);
        this.opp = new Player(secondPlayer);
        this.currentPlayer = this.user;

        this.setupShips(this.user);
        this.setupShips(this.opp);

        this.phase = "placement-p1";
    }

    setupShips(player) {
        player.shipsToPlace = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Destroyer", 3),
            new Ship("Submarine", 3),
            new Ship("Patrol Boat", 2),
        ];
    }

    switchTurns() {
        this.currentPlayer =
            this.currentPlayer === this.user ? this.opp : this.user;
    }

    nextPhase() {
        if (this.phase === "placement-p1") {
            this.switchTurns();
            this.phase = "placement-p2";
        } else if (this.phase === "placement-p2") {
            this.phase = "battle";
            this.currentPlayer = this.user;
        } else if (this.phase === "battle") {
            this.switchTurns();
        }
    }

    checkWinner() {
        if (this.user.board.allShipsSunk()) return "opp";
        if (this.opp.board.allShipsSunk()) return "user";
        return null;
    }
}
