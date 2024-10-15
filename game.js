let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1WinsElem = document.querySelector("#player1-wins");
let player2WinsElem = document.querySelector("#player2-wins");
let gamesPlayedElem = document.querySelector("#games-played");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let gamesPlayed = 0; // Track total games
let player1Wins = 0; // Player 1 Wins (X)
let player2Wins = 0; // Player 2 Wins (O)

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  if (gamesPlayed === 3) {
    resetWins();
  }
};

const resetWins = () => {
  player1Wins = 0;
  player2Wins = 0;
  gamesPlayed = 0;
  updateDisplay();
};

const updateDisplay = () => {
  player1WinsElem.value = player1Wins;
  player2WinsElem.value = player2Wins;
  gamesPlayedElem.value = gamesPlayed;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  gamesPlayed++;
  updateDisplay();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // Update win count based on winner
  if (winner === "X") {
    player1Wins++;
  } else {
    player2Wins++;
  }

  gamesPlayed++;
  updateDisplay();

  if (gamesPlayed === 3) {
    setTimeout(resetWins, 2000); // Reset after showing the message for 2 seconds
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
