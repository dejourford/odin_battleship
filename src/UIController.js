// function to render board
export function renderBoard(board) {
    const app = document.querySelector("#app");

    // remove existing board FIRST
    const existingBoard = document.querySelector(".board");
    if (existingBoard) existingBoard.remove();

    const boardElement = document.createElement("section");
    boardElement.classList.add("board");

    const labelCollection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const size = board.size || 10;

    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.x = labelCollection[j - 1];
            cell.dataset.y = i;

            cell.textContent = `${labelCollection[j - 1]}${i}`;

            boardElement.append(cell);
        }
    }


    const secondPlayerWrapper = document.querySelector(".second-player-ship-wrapper");

    if (secondPlayerWrapper) {
        app.insertBefore(boardElement, secondPlayerWrapper)
    } else {
        app.append(boardElement);
    }
    
}

// render ships
export function renderShips(playerShips) {
    const boardCells = document.querySelectorAll(".cell");

    for (let i = 0; i < playerShips.length; i++) {
        for (let j = 0; j < playerShips[i].coordinates.length; j++) {
            const [x, y] = playerShips[i].coordinates[j];

            boardCells.forEach((cell) => {
                if (cell.dataset.x === x && Number(cell.dataset.y) === y) {
                    cell.classList.add("ship");
                }
            });
        }
    }
}

// function to renderMisses
export function renderMisses(playerBoard) {
    console.log('board:', playerBoard)

    playerBoard.missedAttacks.forEach(([x, y]) => {
        const target = document.querySelector(
            `[data-x="${x}"][data-y="${y}"]`
        );

        if (target) {
            console.log("miss marked")
            target.classList.add("miss");
        }
    });


}

// function to renderHits
export function renderHits(playerBoard) {
    console.log('board:', playerBoard)

    playerBoard.attacks.forEach(([x, y]) => {
        const target = document.querySelector(
            `[data-x="${x}"][data-y="${y}"]`
        );

        if (target) {
            console.log("hit marked")
            target.classList.add("hit");
        }
    });


}


// render player names 
export function renderNames(fp, sp) {
    const firstPlayerName = document.querySelector(".first-player-name");
    const secondPlayerName = document.querySelector(".second-player-name");

    if (firstPlayerName && secondPlayerName) {
        firstPlayerName.remove();
        secondPlayerName.remove();
    }

    const firstPlayerShipWrapper = document.querySelector(".first-player-ship-wrapper");
    const secondPlayerShipWrapper = document.querySelector(".second-player-ship-wrapper");

    if (firstPlayerShipWrapper && secondPlayerShipWrapper) {
        firstPlayerShipWrapper.remove();
        secondPlayerShipWrapper.remove();
    }


    const app = document.querySelector("#app");
    const board = document.querySelector(".board");

    const firstPlayerWrapper = document.createElement("section");
    firstPlayerWrapper.classList.add("first-player-ship-wrapper");

    const firstPlayerText = document.createElement("h3");
    firstPlayerText.classList.add("first-player-name");
    firstPlayerText.textContent = `${fp.name.toUpperCase()}`;

    const firstPlayerShipsList = document.createElement("ul");
    firstPlayerShipsList.classList.add("ship-list");

    for (const shipObject of fp.shipsToPlace) {
        const shipName = document.createElement("li");
        shipName.classList.add("ship-name");
        shipName.textContent =
            shipObject.name + ` (Length: ${shipObject.length})`;

        firstPlayerShipsList.append(shipName);
    }

    const secondPlayerWrapper = document.createElement("section");
    secondPlayerWrapper.classList.add("second-player-ship-wrapper");

    const secondPlayerText = document.createElement("h3");
    secondPlayerText.classList.add("second-player-name");
    secondPlayerText.textContent = `${sp.name.toUpperCase()}`;

    const secondPlayerShipsList = document.createElement("ul");
    secondPlayerShipsList.classList.add("ship-list");

    for (const shipObject of sp.shipsToPlace) {
        const shipName = document.createElement("li");
        shipName.classList.add("ship-name");
        shipName.textContent =
            shipObject.name + ` (Length: ${shipObject.length})`;

        secondPlayerShipsList.append(shipName);
    }

    firstPlayerWrapper.append(firstPlayerText, firstPlayerShipsList);
    secondPlayerWrapper.append(secondPlayerText, secondPlayerShipsList);

    app.insertBefore(firstPlayerWrapper, board);
    app.appendChild(secondPlayerWrapper, secondPlayerText);
}

// function to place ships
export function playerPlaceShips(player, opponent, onComplete) {
    let orientation = "vertical";

    const ships = player.shipsToPlace;
    let currentShipIndex = 0;
    let currentShip = ships[currentShipIndex];

    const app = document.querySelector("#app");
    const grid = document.querySelector(".board");

    // remove old placement text
    const existingText = document.querySelector(".placement-text");
    if (existingText) existingText.remove();

    const placementText = document.createElement("p");
    placementText.classList.add("placement-text");

    function updateText() {
        placementText.innerHTML = `
            <strong>${player.name.toUpperCase()}</strong>, place your <strong>${currentShip.name}</strong>
            <span style="display:block;">Length: ${currentShip.length}</span>
            <span style="display:block;">Orientation: ${orientation}</span>
            <span style="display:block;">Press R to rotate</span>
        `;
    }

    updateText();
    app.after(placementText);

    function getShipPositions(x, y, length, orientation) {
        const positions = [];

        const getNextLetter = (letter, offset) =>
            String.fromCharCode(letter.charCodeAt(0) + offset);

        if (orientation === "vertical") {
            if (y + length - 1 <= 10) {
                for (let i = 0; i < length; i++) {
                    positions.push([x, y + i]);
                }
            }
        } else {
            if (x.charCodeAt(0) + (length - 1) <= "J".charCodeAt(0)) {
                for (let i = 0; i < length; i++) {
                    positions.push([getNextLetter(x, i), y]);
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

            if (target && target.classList.contains("ship")) {
                target.classList.add("error");
            }
        });
    });

    grid.addEventListener("mouseout", () => {
        document.querySelectorAll(".cell.hover").forEach(c =>
            c.classList.remove("hover")
        );
    });

    // click placement
    function handleClick(e) {
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

        if (!positions.length) return;

        try {
            const success = player.board.placeShip(currentShip, positions);
            if (!success) return;



            positions.forEach(([px, py]) => {
                const target = document.querySelector(
                    `[data-x="${px}"][data-y="${py}"]`
                );
                if (target) target.classList.add("ship");
            });

            currentShipIndex++;

            if (currentShipIndex < ships.length) {
                currentShip = ships[currentShipIndex];
                updateText();
            } else {
                placementText.textContent = "All ships placed!";

                grid.removeEventListener("click", handleClick);
                document.removeEventListener("keydown", handleRotate);

                player.allShipsPlaced = true;
                
                if (onComplete) onComplete();
            }

        } catch (error) {
            alert(error.message);
        }

    }

    grid.addEventListener("click", handleClick);

    function handleRotate(e) {
        if (e.key.toLowerCase() === "r") {
            orientation =
                orientation === "vertical" ? "horizontal" : "vertical";

            updateText();
        }
    }

    document.addEventListener("keydown", handleRotate);
}

export function toggleStartButton() {
    const startButton = document.querySelector(".start-button");
    if (!startButton) return;

    startButton.classList.toggle("hidden");
}

