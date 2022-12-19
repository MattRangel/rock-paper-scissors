const PLAY_CHOICES = ["Rock","Paper","Scissors"];
const ROUND_OUTCOMES = ["Player wins", "Computer wins", "Tie"]
const NUM_OF_ROUNDS = 5;
let currentRound = 0;
let scores;

function getComputerChoice() {
	return PLAY_CHOICES[Math.floor(Math.random()*3)];
}

function evaluateRound(playerSelection, computerSelection) {
	let result = (playerSelection === computerSelection) ? ROUND_OUTCOMES[2] :
	(playerSelection === "Rock" && computerSelection === "Scissors" || playerSelection === "Paper" && computerSelection === "Rock" || playerSelection === "Scissors" && computerSelection === "Paper") ? ROUND_OUTCOMES[0]: ROUND_OUTCOMES[1];
	return result;
}

function runRound(playerSelection) {
	let roundEnd = (++currentRound === NUM_OF_ROUNDS);
	if (currentRound === 1) { scores = { computer:0, player:0 }; }
	let computerSelection = getComputerChoice();
	let roundOutcome = evaluateRound(playerSelection, computerSelection);
	if (roundOutcome === "Player wins") { ++scores.player; }
	else if (roundOutcome === "Computer wins") { ++scores.computer; }
	updateHTML(roundOutcome, playerSelection, computerSelection, roundEnd); 
	if (roundEnd) { currentRound = 0; }
}

function updateHTML(roundOutcome, playerChoice, compChoice, roundEnd) {
	const scoreCard = document.querySelector("#score-card");
	const winnerCard = document.querySelector("#winner-card");
	const outcomeCard = document.querySelector("#round-outcome");
	scoreCard.textContent = `Player: ${scores.player} | Computer: ${scores.computer}`
	outcomeCard.textContent = `Round ${currentRound}/${NUM_OF_ROUNDS}: ${playerChoice} vs ${compChoice} (${roundOutcome})`
	outcomeCard.classList.add(["win","lose","tie"][ROUND_OUTCOMES.indexOf(roundOutcome)]);
	if (roundEnd) {
		winnerCard.textContent = "Game over, you " + ((scores.player > scores.computer) ? "won!" :
		(scores.player < scores.computer) ? "lost!" : "tied!");
	} else { winnerCard.textContent = ""; }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", () => runRound(button.textContent)));
document.querySelector("#round-outcome").addEventListener("transitionend",(e) => e.target.classList.remove("win","tie","lose")); 
