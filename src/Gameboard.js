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
    receiveAttack(x, y) {
        
        // loop ships array 
        for (const entry of this.ships) {
            for (const coord of entry.coordinates) {
                if (coord[0] === x && coord[1] === y) {
                    entry.ship.hit();
                    return "hit"
                }
            }
        }
       
        // track misses
        this.missedAttacks.push([x, y]);
        return "miss"
        
    }
    
    // 4. NEEDS TO RETURN TRUE OR FALSE IF ALL SHIPS ARE SUNK
}
