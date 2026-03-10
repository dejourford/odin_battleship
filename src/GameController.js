import { Player } from "./Player.js";

export class GameController {
    constructor() {
        this.user = new Player("user");
        this.cpu = new Player("cpu");

        this.currentPlayer = this.user;
    }
}
