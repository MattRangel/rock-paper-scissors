const playChoices = ["Rock","Paper","Scissors"];

function getComputerChoice() {
	return playChoices[Math.floor(Math.random()*3)];
}

function getPlayerChoice() {
	let choice = prompt("Rock, Paper, or Scissors?");
	choice = (choice !== null) ? choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase() : "";
	if (playChoices.indexOf(choice) === -1) {
		alert("Invalid input.\nDefaulting to rock...");
		choice = "Rock";
	}
	return choice;
}

function playRound(playerSelection, computerSelection) {
	let result = (playerSelection === computerSelection) ? "Tie" :
	(playerSelection === "Rock" && computerSelection === "Scissors" || playerSelection === "Paper" && computerSelection === "Rock" || playerSelection === "Scissors" && computerSelection === "Paper") ? "Player" : "Computer";
	//return `${playerSelection} vs ${computerSelection}: ${result}`;
	return result;
}

function game() {
	let computerPoints = 0;
	let playerPoints = 0;
	for (let i = 0; i < 5; i++) {
		const result = playRound(getPlayerChoice(),getComputerChoice());
		if (result === "Player") { playerPoints += 1; }
		else if (result === "Computer") { computerPoints += 1; }
		console.log(`Round ${i}: ${result}`);
	}
	let winState = (playerPoints > computerPoints) ? "Won" :
	(playerPoints < computerPoints) ? "Lost" : "Tied";
	
	return `You ${winState}, with a score of ${playerPoints} to ${computerPoints}!`;
	//return winState;
}
