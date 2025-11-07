const scoreDisplayEl = document.querySelector(".game__score-value");
const gameBoardEl = document.querySelector(".game-content");
const rulesBtnEl = document.querySelector(".game__button--rules");
const rulesCloseIconEl = document.querySelector(".rules__close-icon");
const overlayEl = document.querySelector(".overlay");

const CHOICES = ["rock", "paper", "scissors"];
let playerSelection, computerSelection;

const renderGameStartScreen = () => `
  ${CHOICES.map(
    (choice) => `
    <div class="game-content__option" data-choice="${choice}">
      <img src="images/icon-${choice}.svg" alt="${choice}" />
    </div>
  `
  ).join("")}
  <img class="game-content__triangle" src="images/bg-triangle.svg" alt="Background Triangle" />
`;

function handlePlayAgainClick() {
  gameBoardEl.className = "game-content game-content--start";
  gameBoardEl.innerHTML = renderGameStartScreen();
}

const determineGameResult = (player, computer) => {
  if (player === computer) return "It's a Draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  )
    return "You Win";
  return "You Lose";
};

const getRandomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

function renderGameResult() {
  computerSelection = getRandomComputerChoice();
  const result = determineGameResult(playerSelection, computerSelection);

  gameBoardEl.className = "game-content game-step game-step--player";
  gameBoardEl.innerHTML = `
  <div class="game-content__player">
    <h3 class="game-content__label">You Picked</h3>
    <div class="game-content__option game-content__option--player" data-choice=${playerSelection}>
      <img class="game-content__icon" src="images/icon-${playerSelection}.svg" alt=${playerSelection} />
    </div>
  </div>
  <div class="game-result">
    <h2 class="game-result__text">${result}</h2>
    <button class="game-result__button">Play Again</button>
  </div>
  <div class="game-content__opponent">
    <h3 class="game-content__label">The House Picked</h3>
    <div class="game-content__option game-content__option--house">
    </div>
  </div>
    `;

  setTimeout(() => {
    gameBoardEl.classList.replace("game-step--player", "game-step--result");

    const computerOptionEl = gameBoardEl.querySelector(
      ".game-content__option--house"
    );
    computerOptionEl.dataset.choice = computerSelection;
    computerOptionEl.innerHTML = `
        <img class="game-content__icon" src="images/icon-${computerSelection}.svg" alt="${computerSelection}" />
      `;

    gameBoardEl
      .querySelector(".game-result__button")
      .addEventListener("click", handlePlayAgainClick);

    if (result === "You Win") {
      scoreDisplayEl.textContent = Number(scoreDisplayEl.textContent) + 1;
    }
  }, 1000);
}

function handlePlayerSelection(event) {
  const selectedOption = event.target.closest(".game-content__option");
  if (!selectedOption || !selectedOption.dataset.choice) return;

  playerSelection = selectedOption.dataset.choice;
  renderGameResult();
}

function toggleRulesModal() {
  overlayEl.classList.toggle("hidden");
}

gameBoardEl.addEventListener("click", handlePlayerSelection);
rulesBtnEl.addEventListener("click", toggleRulesModal);
rulesCloseIconEl.addEventListener("click", toggleRulesModal);
