import { Player } from "./Player.js";

export class GameController {
    constructor() {
        this.user = new Player("user");
        this.cpu = new Player("cpu");

        this.currentPlayer = this.user;
    }

    // 1. check for win condition
    checkWinner() {
        if (this.user.board.allShipsSunk()) {
            return "cpu";
        }


        if (this.cpu.board.allShipsSunk()) {
            return "user";
        }

        return null;
    }



}
