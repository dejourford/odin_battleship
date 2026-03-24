// function to render board
export function renderBoard(board) {
    const app = document.querySelector("#app");
    const boardElement = document.createElement("section");
    boardElement.classList.add("board");

    app.innerHTML = "";

    const labelCollection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const size = board.size || 10;

    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // use letters for x
            cell.dataset.x = labelCollection[j - 1];
            cell.dataset.y = i;

            cell.textContent = `${labelCollection[j - 1]}${i}`;

            boardElement.append(cell);
        }
    }

    app.append(boardElement);
}

// fxn to render ships
export function renderShips(playerShips) {
    const coordinates = [];
    const boardCells = document.querySelectorAll(".cell")

    console.log(playerShips);

    // get ship coordinates from playerShips;
    for (let i = 0; i < playerShips.length; i++) {
        // console.log(playerShips[i].coordinates)
        for (let j = 0; j < playerShips[i].coordinates.length; j++) {
            // console.log(playerShips[i].coordinates[j])

            const [x, y] = playerShips[i].coordinates[j]
            // console.log(x, y)
            //    loop through each cell in the board dom
            boardCells.forEach((cell) => {
                // grab the x (to string) and y (to number) data attributes values
                if (cell.dataset.x === x && Number(cell.dataset.y) === y) {
                    // if values match, then add a .ship class to the cell
                    cell.classList.add("ship")
                    // console.log("match")
                }


            })

        }
    }
    // target board
    // find matching board coordinates with data attribute
}

// fxn to add player names to board
export function renderNames(fp, sp) {
    // remove prior names 
    const firstPlayerName = document.querySelector(".first-player-name");
    const secondPlayerName = document.querySelector(".second-player-name");

    if (firstPlayerName && secondPlayerName) {
        firstPlayerName.remove();
        secondPlayerName.remove();
    }

    const app = document.querySelector("#app");
    const board = document.querySelector(".board")

    const firstPlayer = fp

    const secondPlayer = sp;

    const firstPlayerWrapper = document.createElement("section");

    const firstPlayerText = document.createElement("h3");
    firstPlayerText.classList.add("first-player-name")
    firstPlayerText.textContent = `${firstPlayer.name.toUpperCase()}`

    const firstPlayerShipsList = document.createElement("ul");
    firstPlayerShipsList.classList.add("ship-list");

    for (const shipObject of firstPlayer.board.ships) {
        console.log(shipObject.ship.name)
        const shipName = document.createElement("li");
        shipName.classList.add("ship-name");
        shipName.textContent = shipObject.ship.name + " " + `(Length: ${shipObject.ship.length})`;
        firstPlayerShipsList.append(shipName)
    }


    const secondPlayerWrapper = document.createElement("section");

    const secondPlayerText = document.createElement("h3");
    secondPlayerText.classList.add("second-player-name")
    secondPlayerText.textContent = `${secondPlayer.name.toUpperCase()}`

    const secondPlayerShipsList = document.createElement("ul");
    secondPlayerShipsList.classList.add("ship-list")

    for (const shipObject of secondPlayer.board.ships) {
        console.log(shipObject.ship.name)
        const shipName = document.createElement("li");
        shipName.classList.add("ship-name");
        shipName.textContent = shipObject.ship.name + " " + `(Length: ${shipObject.ship.length})`;
        secondPlayerShipsList.append(shipName)
    }


    firstPlayerWrapper.append(firstPlayerText, firstPlayerShipsList)
    secondPlayerWrapper.append(secondPlayerText, secondPlayerShipsList)
    app.insertBefore(firstPlayerWrapper, board)
    app.appendChild(secondPlayerWrapper, secondPlayerText)

}

export function playerPlaceShips(player) {
    let orientation = "vertical";

    const ships = player.shipsToPlace;

    let currentShipIndex = 0;
    let currentShip = ships[currentShipIndex];

    const app = document.querySelector("#app");
    const grid = document.querySelector(".board");

    // placement UI
    const placementText = document.createElement("p");
    placementText.classList.add("placement-text");

    function updateText() {
        placementText.innerHTML = `
            Place <strong>${currentShip.name}</strong>
            <span style="display:block;">Length: ${currentShip.length}</span>
            <span style="display:block;">Orientation: ${orientation}</span>
            <span style="display:block;">Press R to rotate</span>
        `;
    }

    updateText();
    app.after(placementText);

    // helper
    function getShipPositions(x, y, length, orientation) {
        const positions = [];

        const getNextLetter = (letter, offset) =>
            String.fromCharCode(letter.charCodeAt(0) + offset);

        if (orientation === "vertical") {
            if (y + length - 1 <= 10) {
                for (let i = 0; i < length; i++) {
                    positions.push([x, y + i]);
                }
            } else if (y - (length - 1) >= 1) {
                for (let i = 0; i < length; i++) {
                    positions.push([x, y - i]);
                }
            }
        } else {
            if (x.charCodeAt(0) + (length - 1) <= "J".charCodeAt(0)) {
                for (let i = 0; i < length; i++) {
                    positions.push([getNextLetter(x, i), y]);
                }
            } else if (x.charCodeAt(0) - (length - 1) >= "A".charCodeAt(0)) {
                for (let i = 0; i < length; i++) {
                    positions.push([getNextLetter(x, -i), y]);
                }
            }
        }

        return positions;
    }

    // hover preview
    grid.addEventListener("mouseover", (e) => {
        const cell = e.target.closest(".cell");
        if (!cell) return;

        document.querySelectorAll(".cell").forEach(c =>
            c.classList.remove("hover", "error")
        );

        const x = cell.dataset.x;
        const y = Number(cell.dataset.y);

        const positions = getShipPositions(
            x,
            y,
            currentShip.length,
            orientation
        );

        positions.forEach(([px, py]) => {
            const target = document.querySelector(
                `[data-x="${px}"][data-y="${py}"]`
            );
            if (target) target.classList.add("hover");

            if (target.classList.contains("ship")) {
                target.classList.add("error");
            }
        });
    });

    // clear hover
    grid.addEventListener("mouseout", () => {
        document.querySelectorAll(".cell.hover").forEach(c =>
            c.classList.remove("hover")
        );
    });

    // click placement
    let allShipsPlaced = false;

    function handleClick(e) {
        if (allShipsPlaced) return;

        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = cell.dataset.x;
        const y = Number(cell.dataset.y);

        const positions = getShipPositions(
            x,
            y,
            currentShip.length,
            orientation
        );
        console.log(positions)
        if (!positions.length) return;


        try {
            // call game logic
            const success = player.board.placeShip(currentShip, positions);
            console.log('success:', success)
            if (!success) return;

            // render ship
            positions.forEach(([px, py]) => {
                const target = document.querySelector(
                    `[data-x="${px}"][data-y="${py}"]`
                );
                if (target) target.classList.add("ship");
            });

            // next ship
            currentShipIndex++;

            if (currentShipIndex < ships.length) {
                currentShip = ships[currentShipIndex];
                updateText();
            } else {
                placementText.textContent = "All ships placed!";
                document.removeEventListener("keydown", handleRotate);

                allShipsPlaced = true;

                grid.removeEventListener("click", handleClick)
                // grid.style.pointerEvents = "none"

                player.allShipsPlaced = true;

                return;
            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    grid.addEventListener("click", handleClick);

    // rotate
    function handleRotate(e) {
        if (e.key.toLowerCase() === "r") {
            orientation =
                orientation === "vertical" ? "horizontal" : "vertical";

            updateText();
        }
    }

    document.addEventListener("keydown", handleRotate);

}
