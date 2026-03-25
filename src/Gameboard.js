export class Gameboard {
    constructor() {
        this.size = 10;
        this.ships = [];
        this.missedAttacks = [];
        this.attacks = [];
    }

    // 1. NEEDS TO PLACE SHIP
    placeShip(ship, coordinates) {

    // check for overlapping ships
    for (const coord of coordinates) {
        const [x, y] = coord;

        const overlap = this.ships.some(existingShip =>
            existingShip.coordinates.some(([sx, sy]) => sx === x && sy === y)
        );

        if (overlap) {
            throw new Error("A ship already exists here!");
        }
    }

    this.ships.push({
        ship,
        coordinates
    });

    return true;
}
    // 2. NEEDS TO RECEIVE ATTACKS
    receiveAttack(x, y) {
        // check if [x,y] is in board.attacks. if so throw error

        const alreadyAttacked = 
        this.attacks.some(([ax, ay]) => ax === x && ay === y) ||
        this.missedAttacks.some(([mx, my])=> mx === x && my === y);

        if (alreadyAttacked) {
            throw new Error("This attack has already been made!");
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
