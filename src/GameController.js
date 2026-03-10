import { Player } from "./Player.js";

export class GameController {
    constructor() {
        this.user = new Player("user");
        this.cpu = new Player("cpu");

        this.currentPlayer = this.user;
    }

    // 1. check for win condition
    checkWinner(board) {
        // loop through each ship's isSunk()
        return board.ships.every(entry => entry.ship.isSunk());
    }



}
