import { Ship } from "../src/Ship";

// test the ship stores length
test("ship stores its length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
})

// test ship hits
test("ship gets hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
})

// test if ship is sunken 
test("ship sinks after enough hits", () => {
    const ship = new Ship(3);
    ship.hit()
    ship.hit()
    ship.hit()

    expect(ship.isSunk()).toBe(true);
})
