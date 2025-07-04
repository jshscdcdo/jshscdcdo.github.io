let currentPlayer = Math.random() < 0.5 ? "X" : "O";
let game = false;
let xWins = 0;
let oWins = 0;
const cells = document.querySelectorAll(".cell");
let playerDisplay = document.getElementById("playerDisplay");
let scoreXDisplay = document.getElementById("scoreX");
let scoreODisplay = document.getElementById("scoreO");
let elements = [
  document.getElementById("0"),
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3"),
  document.getElementById("4"),
  document.getElementById("5"),
  document.getElementById("6"),
  document.getElementById("7"),
  document.getElementById("8"),
];

function updatePlayerDisplay() {
  playerDisplay.innerText = `Aktueller Spieler: ${currentPlayer}`;
}

function updateScoreDisplay() {
  scoreXDisplay.innerText = `X gewinnt: ${xWins}`;
  scoreODisplay.innerText = `O gewinnt: ${oWins}`;
}

for (let i = 0; i < elements.length; i++) {
  let element = elements[i];
  element.addEventListener("click", onClick);
}

const restartBtn = document.getElementById("restartBtn");


function clearBoard() {
  for (let el of elements) {
    el.innerText = "";
    el.style.backgroundColor = "";
  }
  game = false;
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  updatePlayerDisplay();


  restartBtn.disabled = true;
}
function onClick(e) {
  let target = e.target;
  if (target.innerText === "" && !game) {
    target.innerText = currentPlayer;

    let winCombo = win();
    if (winCombo !== null) {
      playerDisplay.innerText = "Spieler " + currentPlayer + " hat gewonnen!";
      game = true;

      for (let indexField of winCombo) {
        elements[indexField].style.backgroundColor = "green";
      }


      if (currentPlayer === "X") {
        xWins++;
      } else {
        oWins++;
      }
      updateScoreDisplay();
      restartBtn.disabled = false

      return;
    }

    if (isDraw()) {
      playerDisplay.innerText = "Unentschieden!";
      game = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updatePlayerDisplay();
  }
}



function isDraw() {
  return elements.every((el) => el.innerText !== "");
}

function win() {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of combos) {
    let [a, b, c] = combo;
    if (
      elements[a].innerText !== "" &&
      elements[a].innerText === elements[b].innerText &&
      elements[a].innerText === elements[c].innerText
    ) {
      return combo;
    }
  }

  return null;
}

function newGame() {
  for (let el of elements) {
    el.innerText = "";
    el.style.backgroundColor = "";
  }
  game = false
  currentPlayer = Math.random() < 0.5 ? "X" : "O"
  updatePlayerDisplay();
}

restartBtn.addEventListener("click", () => {
  newGame();
});

updatePlayerDisplay();
updateScoreDisplay();
