import { Ship } from "../src/Ship";

// test the ship stores length
test("ship stores its length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
})

// test ships outside of length range can't be created
test("ships outside of length range can't be created", () => {
    expect(() => new Ship(6)).toThrow("Invalid ship length!")
    expect(() => new Ship(8)).toThrow("Invalid ship length!")
    expect(() => new Ship(0)).toThrow("Invalid ship length!")
     expect(() => new Ship(1)).toThrow("Invalid ship length!")
})

// test ship hits
test("ship gets hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
})

// test if ship is sunken : should return true
test("ship sinks after enough hits", () => {
    const ship = new Ship(3);
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship.isSunk()).toBe(true);
})

// test if ship is sunken : sould return false
test("ship sinks after enough hits", () => {
    const ship = new Ship(4);
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship.isSunk()).toBe(false);
})
