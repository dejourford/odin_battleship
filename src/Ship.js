// create class for ships
export class Ship {

    constructor(length) {
        if (length <= 0) {
            throw new Error("Invalid ship length!")
        }

        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++
    }


    isSunk() {
        return this.hits >= this.length;
    }
}
