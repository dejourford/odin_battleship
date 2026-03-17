import { Gameboard } from "./src/Gameboard.js";
import { GameController } from "./src/GameController.js";
import { renderBoard, renderNames } from "./src/UIController.js";


// call render board on page load
renderBoard([]);

// create function to render form
const renderForm = () => {
    const app = document.querySelector("#app");
    const board = document.querySelector(".board");

    // create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    // create modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // create form
    const form = document.createElement("form");

    // create player 1 group
    const playerOneGroup = document.createElement("div");
    playerOneGroup.classList.add("player-group");

    const playerOnelabel = document.createElement("label");
    playerOnelabel.textContent = "Player Name";

    const playerOneInput = document.createElement("input");
    playerOneInput.name = "player-one"
    playerOneInput.placeholder = "Player Name";

    // create player 2 group
    const playerTwoGroup = document.createElement("div");
    playerTwoGroup.classList.add("player-group");

    const playerTwolabel = document.createElement("label");
    playerTwolabel.textContent = "Player Name (or enter 'cpu' to play the cpu)";

    const playerTwoInput = document.createElement("input");
    playerTwoInput.name = "player-two"
    playerTwoInput.placeholder = "Player Name (or enter 'cpu' to play the cpu)";

    // create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList = "submit-button";
    submitButton.textContent = "Submit";

    // form assembly
    playerOneGroup.append(playerOnelabel, playerOneInput);
    playerTwoGroup.append(playerTwolabel, playerTwoInput);
    form.append(playerOneGroup, playerTwoGroup, submitButton);

    // assembly
    modal.append(form);
    overlay.append(modal);

    // insert before board
    app.insertBefore(overlay, board);

    // form listener
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (playerOneInput.value === "" || playerTwoInput.value === "") return;
        

        const formData = new FormData(form)

        const firstPlayer = formData.get("player-one").toLowerCase();
        const secondPlayer = formData.get("player-two").toLowerCase();
        console.log(firstPlayer, secondPlayer)

        form.reset();
        overlay.remove();

        // create game
        const game = new GameController(firstPlayer, secondPlayer);
        console.log(game)
        renderNames(firstPlayer, secondPlayer)
    })

};

// render form to get player data when start button pressed
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    renderForm();
})

// global click listeners for the document
document.addEventListener("click", (e) => {

    // modal listeners
    const modalOverlay = document.querySelector(".modal-overlay");
    const form = document.querySelector("form")

    if (e.target.matches(".modal-overlay")) {
        form.reset();
        modalOverlay.remove();
    }
})

