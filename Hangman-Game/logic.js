/// GLOBAL VARIABLES
/// -----------------------------------------------------------------------
/// Arrays and variables for holding data
var wordOptions = ["goat", "giraffe", "zebra", "rhino", "elephant", "lion"];
var selectedWord = '';
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;


/// FUNCTIONS (Resusable blocks of code that I will call upon when needed.)
/// -----------------------------------------------------------------------

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersInWord = selectedWord.split("");
	numBlanks = lettersInWord.length;

	/// Reset
	guessesLeft = 9
	wrongLetters = [];
	blanksAndSuccesses = [];

	/// Populate blanks and successes with right number of blanks. 
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	/// Change HTML to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	/// Testing & Debugging
	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

/// COME BACK TO THIS
function checkLetters(letter) {
	///Check if letter exists in word at all
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	/// Check where in the word the letter exists, then populate out blanksandSuccesses array.
	if(isLetterInWord) {
		for (var i = 0; i < numBlanks; i++) {
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}

	/// Letter wasn't found
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}

	/// Testing & Debugging
	console.log(blanksAndSuccesses)

}

function roundComplete() {
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft)

	/// Update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	// Check if user won
	if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won!");

		/// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	/// Check if user lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost");

		/// Update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}

/// MAIN PROCESSES 
/// -----------------------------------------------------------------------

/// Initiate the code for the first time
startGame();

/// Register keyclicks
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	/// Testing / Debugging
	console.log(letterGuessed)
}

