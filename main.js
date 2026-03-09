import { Ship } from "./src/Ship.js";
import { Gameboard } from "./src/Gameboard.js";


const newBoard = new Gameboard();
const ship1 = new Ship(3);
newBoard.placeShip(ship1, [[1,3], [1, 4], [1, 5]])
ship1.hit();
ship1.hit();
newBoard.receiveAttack(1, 3)

console.log(newBoard.allShipsSunk());


