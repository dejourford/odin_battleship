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
    if (board = []) {
        const labelCollection = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let i = 1; i < 11; i++) {

            for (let j = 1; j < 11; j++) {
                // build grid of cells
                const cell = document.createElement("div");
                cell.classList.add("cell");

                // give data attributes that represent cell coordinates
                cell.dataset.x = labelCollection[j -1];
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
    console.log(playerShips);

    // get ship coordinates from playerShips;
    for (let i = 0; i < playerShips.length;  i++) {
        console.log(playerShips[i].coordinates)
        for (let j = 0; j < playerShips[i].coordinates.length; j++) {
            console.log(playerShips[i].coordinates[j])

           
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

    const firstPlayerText = document.createElement("p");
    firstPlayerText.classList.add("first-player-name")
    firstPlayerText.textContent = `${firstPlayer.toUpperCase()}`

    const secondPlayerText = document.createElement("p");
    secondPlayerText.classList.add("second-player-name")
    secondPlayerText.textContent = `${secondPlayer.toUpperCase()}`

    app.insertBefore(firstPlayerText, board)
    app.appendChild(secondPlayerText)
}
