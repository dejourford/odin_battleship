import { Player } from "./Player.js";
import { Ship } from "./Ship.js";

export class GameController {
    constructor() {
        this.user = new Player("user");
        this.cpu = new Player("cpu");

        this.currentPlayer = this.user;
    }

    

    // 1. setup chips
    setupShips() {
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)

        console.log(this.currentPlayer)
        this.currentPlayer.board.placeShip(carrier, [[0,0],[0,1],[0,2],[0,3],[0,4]]);
        this.currentPlayer.board.placeShip(battleship, [[2,0],[2,1],[2,2],[2,3]]);
        this.currentPlayer.board.placeShip(destroyer, [[4,0],[4,1],[4,2]]);
        this.currentPlayer.board.placeShip(submarine, [[6,0],[6,1],[6,2]]);
        this.currentPlayer.board.placeShip(patrolBoat, [[8,0],[8,1]]);
    }

    // 3. check for win condition
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
