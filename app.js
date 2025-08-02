let tiles = document.querySelectorAll(".tiles");
let reset = document.querySelector(".r-btn");
let new_game = document.getElementById("new-game");
let winning_msg = document.getElementById("winningCod");
let winning_container = document.querySelector(".winner");
let human_human = document.getElementById("h-h")
let comp_human = document.getElementById("c-h")
let player1 = true;
let currentMode = "human";

let winningPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    enableTiles();
    player1 = true;
    winning_container.style.display = "none";
};

const removeAllListeners = () => {
    tiles.forEach(tile => {
        let newTile = tile.cloneNode(true);
        tile.parentNode.replaceChild(newTile, tile);
    });
    tiles = document.querySelectorAll(".tiles");
};

function humanVsHuman() {
    currentMode = "human";
    removeAllListeners();
    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (tile.innerText !== "") return;

            if (player1 === true) {
                tile.innerText = "X";
                player1 = false;
            } else {
                tile.innerText = "O";
                player1 = true;
            }
            tile.disabled = true;
            winnerCheck();
            tile.style.color = "none"
        });
    });
};


function computerVsHuman() {
    currentMode = "computer";
    removeAllListeners();

    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (player1 && tile.innerText === "") {
                tile.innerText = "X";
                tile.disabled = true;

                const winner = winnerCheck(); 

                if (winner) return; 

                setTimeout(() => {
                    compMove();
                }, 500);

                player1 = false;
            }
        });
    });
}


const disableTiles = () => {
    for (let tile of tiles) {
        tile.disabled = true;
    }
};

const enableTiles = () => {
    for (let tile of tiles) {
        tile.disabled = false;
        tile.innerText = "";
    }
};

const showWinner = (winner) => {
    winning_msg.innerText = 'Congrats the winner is ' + winner;
    winning_container.style.display = "block";
    disableTiles();
};

const winnerCheck = () => {
    for (let pattern of winningPatterns) {
        let pos1 = tiles[pattern[0]].innerText;
        let pos2 = tiles[pattern[1]].innerText;
        let pos3 = tiles[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                disableTiles()
                return pos1
            }
        }
    }
};

function compMove() {
    let emptyTiles = [];
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].innerText === "") {
            emptyTiles.push(tiles[i]);
        }
    }

    if (emptyTiles.length === 0) return;

    let randomIndex = Math.floor(Math.random() * emptyTiles.length);
    let chosenTile = emptyTiles[randomIndex];

    chosenTile.innerText = "O";
    chosenTile.disabled = true;

    winnerCheck();
    player1 = true;
}

new_game.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
