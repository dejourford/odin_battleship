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
                cell.dataset.x = i;
                cell.dataset.y = j;

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
