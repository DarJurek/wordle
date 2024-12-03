const words = ["apple", "grape", "peach", "mango", "berry", "lemon", "melon", "plumb", "olive"];


document.addEventListener("DOMContentLoaded", () => {
  createKeybord();

  const word = words[Math.floor(Math.random() * words.length)];
  console.log(word);

  let guessedWords = [[]];
  let availableSpace = 1;
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
      const currentWordArr = getCurrentWordArr();

      if (currentWordArr && currentWordArr.length < 5) {
          currentWordArr.push(letter);

          const availableSpaceEl = document.getElementById(String(availableSpace));
          availableSpace = availableSpace + 1;
          availableSpaceEl.textContent = letter;
      }
  }

  function giveFeedback(letter, i) {
      if (!word.includes(letter)) {
          return "rgb(165, 42, 42)"; 
      }
      else if (word[i] === letter) {
          return "rgb(83, 141, 78)"; 
      }
      return "rgb(255, 204, 0)"; 
  }

  function handleSubmitWord() {
      const currentWordArr = getCurrentWordArr();
      if (currentWordArr.length !== 5) {
          window.alert("Word must be 5 letters");
          return;
      }

      const currentWord = currentWordArr.join("");

      const firstLetterId = guessedWordCount * 5 + 1;
      currentWordArr.forEach((letter, i) => {
          const boxColor = giveFeedback(letter, i);

          const letterId = firstLetterId + i;
          const letterEl = document.getElementById(letterId);
          letterEl.classList.add("animate__flipInX");
          letterEl.style = `background-color:${boxColor};border-color:${boxColor}`;
      });

      guessedWordCount += 1;

      if (currentWord === word) {
          window.alert("Congratulations! You've guessed the word.");
          return;
      }

      if (guessedWords.length === 6) {
          window.alert(`Sorry, you've run out of guesses. The word was: ${word}.`);
          return;
      }

      guessedWords.push([]);
  }

  function createKeybord() {
      const gameBoard = document.getElementById("board");

      for (let i = 0; i < 30; i++) {
          let square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("animate__animated");
          square.setAttribute("id", i + 1);
          gameBoard.appendChild(square);
      }
  }

  function handleDeleteLetter() {
      const currentWordArr = getCurrentWordArr();
      const removedLetter = currentWordArr.pop();

      guessedWords[guessedWords.length - 1] = currentWordArr;

      const lastLetterEl = document.getElementById(String(availableSpace - 1));
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
          const letter = target.getAttribute("data-key");

          if (letter === "enter") {
              handleSubmitWord();
              return;
          }

          if (letter === "del") {
              handleDeleteLetter();
              return;
          }

          updateGuessedWords(letter);
      };
  }
});