// create class for ships
export class Ship {

    constructor(name, length) {
        if (length <= 1 || length > 5) {
            throw new Error("Invalid ship length!")
        }
        this.name = name;
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
