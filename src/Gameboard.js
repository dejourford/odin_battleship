export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.attacks = [];
    }

    // 1. NEEDS TO PLACE SHIP
    placeShip(ship, coordinates) {
        // if ships array already has a ship with ship.length, throw error
        console.log(this.ships)
        if (this.ships.length !== 0) {
            for (const item of this.ships) {
            if (item.ship.length === ship.length) {
                throw new Error("This ship already exists!")
            }
        }
        }
        
        
        
        this.ships.push({
            ship, 
            coordinates
        })
    }
    // 2. NEEDS TO RECEIVE ATTACKS
    receiveAttack(x, y) {
        // check if [x,y] is in board.attacks. if so throw error
        
        if (this.attacks.some(([ax, ay]) => ax === x && ay === y)) {
            throw new Error("This attack has already been made!")
        }


        // loop ships array 
        for (const entry of this.ships) {
            
            for (const coord of entry.coordinates) {
                
                const [cx, cy] = coord;
                
                if (cx === x && cy === y) {
                    entry.ship.hit();
                    this.attacks.push([x, y])
                    return "hit"
                }
            }
        }
       
        // track misses
        this.missedAttacks.push([x, y]);
        return "miss"
        
    }
    
    // 4. NEEDS TO RETURN TRUE OR FALSE IF ALL SHIPS ARE SUNK
    allShipsSunk() {
        if (this.ships.length > 0) {

            return this.ships.every(entry => entry.ship.isSunk());
        }
    }
}
