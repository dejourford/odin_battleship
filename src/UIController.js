// function to render board
export function renderBoard(board) {
    console.log('board:', board)

    // define target for board
    const app = document.querySelector("#app");
    const boardElement = document.createElement("section")
    boardElement.classList.add("board");


    // set innerHTML to empty string
    app.innerHTML = "";

    // if empty array is passed, then render empty board
    if (board.length === 0) {
        const labelCollection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let i = 1; i < 11; i++) {

            for (let j = 1; j < 11; j++) {
                // build grid of cells
                const cell = document.createElement("div");
                cell.classList.add("cell");

                // give data attributes that represent cell coordinates
                cell.dataset.x = labelCollection[j - 1];
                cell.dataset.y = i;

                // visible label
                cell.textContent = `${labelCollection[j - 1]}${i}`

                boardElement.append(cell);


            }

        }
    }

    // for loop for board length
    if (board.size) {
        const labelCollection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let i = 1; i < board.size + 1; i++) {

            for (let j = 1; j < board.size + 1; j++) {
                // build grid of cells
                const cell = document.createElement("div");
                cell.classList.add("cell");

                // give data attributes that represent cell coordinates
                cell.dataset.x = i;
                cell.dataset.y = j;

                // visible label
                cell.textContent = `${labelCollection[j - 1]}${i}`

                boardElement.append(cell);


            }

        }
    }

    // assembly
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

// playerPlaceShips() to get user input
export function playerPlaceShips(player) {
    console.log(player, 'will place their ships')

    // define ships
    const ships = player.board.ships
    console.log(ships)

    // define curentShip
    let currentShipIndex = 0;
    let currentShip = ships[currentShipIndex];

    // create text in dom to let user know which ship they are placing
    const placementText = document.createElement("p");
    placementText.classList.add("placement-text");
    placementText.innerHTML = `
  Place <span style="color: crimson;"><strong>${currentShip.ship.name}</strong></span> on the battlefield.
  <span style="display:block;">Length: ${currentShip.ship.length}</span>
`;

    const app = document.querySelector("#app");
    app.after(placementText)

    // define grid
    const grid = document.querySelector(".board")

    grid.addEventListener("click", (e) => {
        const cell = e.target;

        if (!cell.classList.contains("cell")) return;

        console.log("placing:", currentShip)

        const x = cell.dataset.x;
        const y = Number(cell.dataset.y);

        // attempt placement
    })



}
