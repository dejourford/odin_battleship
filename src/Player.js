import { Gameboard } from "./Gameboard.js";


// player class with two types of players (real and cpu)
// each player object shoud have its own gameboard
export class Player {
    constructor(name) {
     
        
        
        this.type = name === "cpu" ? "cpu" : "user"
        this.name = name;
        this.board = new Gameboard();
    }

    attack(enemyBoard, x, y) {
        
        enemyBoard.receiveAttack(x, y)
    } 
}
