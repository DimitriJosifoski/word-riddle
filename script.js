// Create a bank of words to choose from for each game
const wordList = ["APPLE", "BANJO", "CHAIR", "DANCE", "EAGLE", "FLUTE", "GRAPE", "HOUSE", "IGLOO", "JOKER", "KITES", "LEMON", "MANGO", "NURSE", "OASIS", "PEARL", "QUICK", "ROBOT", "SNAKE", "TIGER", "HARPY", "BOWEL", "SNIPE", "BAGEL", "SUGAR", "LATTE", "BLACK", "WHITE", "BROWN", "GREEN", "MOVIE", "NIGHT", "PHONE", "CHESS", "GEARS", "EVENT", "ZEALS", "ZELDA", "INTEL", "LIGHT", "RAPID","EXCEL", "WORDS", "CHARGE", "CALEB", "SERVE", "GRIND", "MAMMA", "PZAZZ", "EPOXY", "MUMMY", "CACOA", "WOOER", "IONIC", "COYLY", "ZESTY", "NYMPH", "REBUS", "BLOKE", "KNOLL"];
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
  } 
  else {
    attempts++;
    
    for (let i = 0; i < userWord.length; i++) {
      const inputBox = document.getElementById(`text_input${attempts}_${i+1}`)
      if (userWord[i] === randomWord[i]) {
        inputBox.style.backgroundColor = "green";
      } else if (randomWord.includes(userWord[i])) {
        inputBox.style.backgroundColor = "yellow";
      } else {
        inputBox.style.backgroundColor = "gray";
      }
    }
    
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

const submit = (id) => {
  const userInput = getUserWord(id);
  checkWord(userInput);
}

// Set up event listeners for each submit button
for (let i = 1; i <= 5; i++) {
  document.getElementById(`submit${i}`).addEventListener("click", () => {
    submit(i);
  });
}

let submitId = 1;
window.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    submit(submitId);
    submitId++;
    const nextInput = document.getElementById(`text_input${submitId}_${1}`);
    nextInput.focus(); // Move to the next row's first box to enter the next word
  }
});

// Function to add auto-focus behavior to all input boxes
const addAutoFocus = () => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    for (let i = 1; i <= 5; i++) {
      const currentInput = document.getElementById(`text_input${attempt}_${i}`);
      currentInput.addEventListener("input", (event) => {
        if (event.target.value.length === 1) { // Check if a letter was entered
          const nextInput = document.getElementById(`text_input${attempt}_${i + 1}`);
          if (nextInput) {
            nextInput.focus(); // Move to the next input box
          }
        }
      });

      // Add backspace behavior to go to previous box if empty
      currentInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && event.target.value === "") {
          const prevInput = document.getElementById(`text_input${attempt}_${i - 1}`);
          if (prevInput) {
            prevInput.focus(); // Move to the previous input box
          }
        }
      });
    }
  }
};

// Call addAutoFocus to set up the auto-move functionality
addAutoFocus();
