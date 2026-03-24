import { GameController } from "./src/GameController.js";
import { playerPlaceShips, renderBoard, renderNames, renderShips } from "./src/UIController.js";

// define game variable
let game = null;

// call render board on page load
renderBoard({ size: 10 });

/* =========================
   CREATE FORM 
========================= */
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

    // player 1 group
    const playerOneGroup = document.createElement("div");
    playerOneGroup.classList.add("player-group");

    const playerOnelabel = document.createElement("label");
    playerOnelabel.textContent = "Player Name";

    const playerOneInput = document.createElement("input");
    playerOneInput.name = "player-one";
    playerOneInput.placeholder = "Player Name";

    // player 2 group
    const playerTwoGroup = document.createElement("div");
    playerTwoGroup.classList.add("player-group");

    const playerTwolabel = document.createElement("label");
    playerTwolabel.textContent =
        "Player Name (or enter 'cpu' to play the cpu)";

    const playerTwoInput = document.createElement("input");
    playerTwoInput.name = "player-two";
    playerTwoInput.placeholder =
        "Player Name (or enter 'cpu' to play the cpu)";

    // submit button
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.classList = "submit-button";
    submitButton.textContent = "Submit";

    // assemble form
    playerOneGroup.append(playerOnelabel, playerOneInput);
    playerTwoGroup.append(playerTwolabel, playerTwoInput);
    form.append(playerOneGroup, playerTwoGroup, submitButton);

    // assemble modal
    modal.append(form);
    overlay.append(modal);

    // insert into DOM
    app.insertBefore(overlay, board);

    // trigger submit
    submitButton.addEventListener("click", () => {
        form.requestSubmit();
    });

    // handle submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!playerOneInput.value || !playerTwoInput.value) return;

        const firstPlayer = playerOneInput.value.toLowerCase();
        const secondPlayer = playerTwoInput.value.toLowerCase();

        form.reset();
        overlay.remove();

        startGame(firstPlayer, secondPlayer);
    });
};

/* =========================
   START GAME
========================= */
function startGame(player1, player2) {
    game = new GameController(player1, player2);
console.log(game.user)
    renderNames(game.user, game.opp);

    handlePhase(); 
}

/* =========================
   PHASE ROUTER
========================= */
function handlePhase() {
    if (game.phase === "placement-p1" || game.phase === "placement-p2") {
        startPlacementPhase();
    } else if (game.phase === "battle") {
        startBattlePhase();
    }
}

/* =========================
   PLACEMENT PHASE
========================= */
function startPlacementPhase() {
    playerPlaceShips(game.currentPlayer,
        game.currentPlayer === game.user ? game.opp : game.user,
         () => {
        game.nextPhase();

        renderBoard(game.currentPlayer.board);
        renderShips(game.currentPlayer.board.ships);
        renderNames(game.user, game.opp);

        handlePhase();
    });
}

/* =========================
   BATTLE PHASE
========================= */
function startBattlePhase() {
    console.log("Battle phase started");

    const grid = document.querySelector(".board");

    function handleAttack(e) {
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = cell.dataset.x;
        const y = Number(cell.dataset.y);

        const enemy =
            game.currentPlayer === game.user ? game.opp : game.user;

        try {
            const result = enemy.board.receiveAttack(x, y);

            // add hit/miss class
            cell.classList.add(result);

            const winner = game.checkWinner();
            if (winner) {
                alert(`${winner} wins!`);
                grid.removeEventListener("click", handleAttack);
                return;
            }

            game.nextPhase();

            renderBoard(enemy.board);
            renderShips(enemy.board.ships);
            renderNames(game.user, game.opp);

            handlePhase();
        } catch (err) {
            alert(err.message);
        }
    }

    grid.addEventListener("click", handleAttack);
}

/* =========================
   GLOBAL CLICK HANDLER 
========================= */
function handleGlobalClick(e) {
    const modalOverlay = document.querySelector(".modal-overlay");

    if (!modalOverlay) return;

    if (e.target.matches(".modal-overlay")) {
        const form = e.target.querySelector("form");
        if (form) form.reset();

        e.target.remove();
    }
}

/* =========================
   EVENT LISTENERS
========================= */
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", renderForm);

document.addEventListener("click", handleGlobalClick);
