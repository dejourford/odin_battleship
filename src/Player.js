import { Gameboard } from "./Gameboard.js";


// player class with two types of players (real and cpu)
// each player object shoud have its own gameboard
export class Player {
    constructor(type) {
     
        const validTypes = ["cpu", "user"]
        if (!validTypes.includes(type)) {
            throw new Error("Player type must be 'user' or 'cpu'")
        }
        
        this.type = type;
        this.board = new Gameboard();
    }

    attack(enemyBoard, x, y) {
        
        enemyBoard.receiveAttack(x, y)
    } 
}
