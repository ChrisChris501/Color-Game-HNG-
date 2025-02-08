const colorBox = document.getElementById('colorBox');
const colorOptions = document.querySelectorAll('.color-option');
const gameStatus = document.getElementById('game-status');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let targetColor = '';
let score = 0;

// Generate a random RGB color
function generateRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

// Start a new round
function startRound() {
	targetColor = generateRandomColor();
	gameStatus.textContent = 'Guess the color!';
	gameStatus.style.color = 'black';

	// The box displays a question mark
	colorBox.style.backgroundColor = '#f4f4f4';
	colorBox.textContent = '?';
	colorBox.style.display = 'flex';
	colorBox.style.alignItems = 'center';
	colorBox.style.justifyContent = 'center';
	colorBox.style.fontSize = '2rem';
	colorBox.style.fontWeight = 'bold';

	// Array of colors
	let colors = [targetColor];
	while (colors.length < 6) {
		let newColor = generateRandomColor();
		if (!colors.includes(newColor)) {
			colors.push(newColor);
		}
	}

	colors.sort(() => Math.random() - 0.5);

	colorOptions.forEach((button, index) => {
		button.style.backgroundColor = colors[index];
		button.onclick = () => checkGuess(colors[index]);
	});
}

// Check user's guess
function checkGuess(selectedColor) {
	if (selectedColor === targetColor) {
		gameStatus.textContent = 'Correct! +100 points';
		gameStatus.style.color = 'green';
		score += 100;

		colorBox.style.backgroundColor = targetColor;
		colorBox.textContent = '';
	} else {
		gameStatus.textContent = 'Wrong! -100 points';
		gameStatus.style.color = 'red';
		score -= 100;
	}

	scoreDisplay.textContent = score;

	setTimeout(startRound, 1000);
}

// Restart the game
function startGame() {
	score = 0;
	scoreDisplay.textContent = score;
	startRound();
}

newGameButton.addEventListener('click', startGame);

startGame();
