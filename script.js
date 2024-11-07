// script.js

const wordList = ["APPLE", "BANJO", "CHAIR", "DANCE", "EAGLE", "FLUTE", "GRAPE", "HOUSE", "IGLOO", "JOKER", "KITES", "LEMON", "MANGO", "NURSE", "OASIS", "PEARL", "QUICK", "ROBOT", "SNAKE", "TIGER"];
let randomWord = "";
let attempts = 0;

// Function to select a random word from the list
const fetchRandomWord = () => {
  randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("Selected word:", randomWord);  // For debugging purposes
};

// Call this function at the start of the game
fetchRandomWord();

// Update message on the screen
const updateMessage = (msg) => {
  document.getElementById("message").innerText = msg;
};

// Check if user input matches the word
const checkWord = (userWord) => {
  if (userWord.length !== 5) {
    updateMessage("Error! Word must be 5 letters.");
    return;
  }

  if (userWord === randomWord) {
    updateMessage("Congratulations! You've guessed the word!");
  } else {
    let result = "";
    for (let i = 0; i < userWord.length; i++) {
      if (userWord[i] === randomWord[i]) {
        result += "🟩"; // Correct position
      } else if (randomWord.includes(userWord[i])) {
        result += "🟨"; // Correct letter, wrong position
      } else {
        result += "⬜"; // Incorrect letter
      }
    }
    updateMessage(result);
    attempts++;
    if (attempts === 5 && userWord !== randomWord) {
      updateMessage(`You've lost! The word was: ${randomWord}`);
    }
  }
};

// Helper function to get the combined word from input boxes for each row
const getUserWord = (attemptId) => {
  let word = "";
  for (let i = 1; i <= 5; i++) {
    const letter = document.getElementById(`text_input${attemptId}_${i}`).value.toUpperCase();
    word += letter;
  }
  return word;
};

// Set up event listeners for each submit button
for (let i = 1; i <= 5; i++) {
  document.getElementById(`submit${i}`).addEventListener("click", () => {
    const userInput = getUserWord(i);
    checkWord(userInput, i);
  });
}
