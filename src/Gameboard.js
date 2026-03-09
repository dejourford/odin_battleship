export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
    }

    // 1. NEEDS TO PLACE SHIP
    placeShip(ship, coordinates) {
        this.ships.push({
            ship, 
            coordinates
        })
    }
    // 2. NEEDS TO RECEIVE ATTACKS
    receiveAttack() {
        console.log("attack received")
    }
    
    // 4. NEEDS TO RETURN TRUE OR FALSE IF ALL SHIPS ARE SUNK
}
