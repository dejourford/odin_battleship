import { GameController } from "./src/GameController.js";
import { playerPlaceShips, renderBoard, renderHits, renderMisses, renderNames, renderShips } from "./src/UIController.js";

// define game variable
let game = null;
let battleListenerAttached = false;
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

function updateText() {
    const placementText = document.querySelector(".placement-text")

    placementText.innerHTML = `
        ${game.currentPlayer.name.toUpperCase()} place your attack.    
        `;

        console.log(game.currentPlayer);
}

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

            const enemy = game.getEnemyPlayer();
            renderBoard(enemy.board);
            renderNames(game.user, game.opp);
            updateText();
            handlePhase();
        });
}



/* =========================
   BATTLE PHASE
========================= */
function startBattlePhase() {
    console.log("Battle phase started");

    // remove old listeners
    const grid = document.querySelector(".board");

    grid.replaceWith(grid.cloneNode(true));
    const newGrid = document.querySelector(".board");

    newGrid.addEventListener("click", handleAttack);

    if (game.isCpuTurn()) {
        console.log("cpu turn");
        runCpuTurn();
    }

    function handleAttack(e) {
        if (game.isCpuTurn()) return; 

        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = String(cell.dataset.x);
        const y = Number(cell.dataset.y);

        processAttack(x, y);
    }

    function processAttack(x, y) {
        const attacker = game.currentPlayer;
        const defender = game.getEnemyPlayer();

        try {
            const result = defender.board.receiveAttack(x, y);

            renderBoard(defender.board);
            renderMisses(defender.board);
            renderHits(defender.board);

            if (game.checkWinner()) {
                alert(`${game.checkWinner()} wins!`);
                document.querySelector(".board").style.pointerEvents = "none";
                return;
            }

            setTimeout(() => {
                game.nextPhase();

                if (game.isCpuTurn()) {
                    runCpuTurn();
                    return;
                }

                const nextDefender = game.getEnemyPlayer();

                renderBoard(nextDefender.board);
                renderMisses(nextDefender.board);
                renderHits(nextDefender.board);

                renderNames(game.user, game.opp);
                updateText();
                handlePhase();
            }, 2000);
        } catch (err) {
            alert(err.message);
        }
    }

    function runCpuTurn() {
        console.log("CPU TURN");

        const enemy = game.getEnemyPlayer();

        let x, y;
        let valid = false;

        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

        while (!valid) {
            x = letters[Math.floor(Math.random() * 10)];
            y = Math.floor(Math.random() * 10) + 1;

            const alreadyUsed =
                enemy.board.attacks.some(([ax, ay]) => ax === x && ay === y) ||
                enemy.board.missedAttacks.some(([mx, my]) => mx === x && my === y);

            if (!alreadyUsed) valid = true;
        }

        setTimeout(() => {
            processAttack(x, y);
            updateText();
        }, 2000);
    }
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
