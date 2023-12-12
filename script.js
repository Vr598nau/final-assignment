document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const actualMovesSpan = document.getElementById("actual-moves");
    const timerSpan = document.getElementById("timer");
    let actualMoves = 0;
    let startTime;
  
  
  
    // Create a 5x5 grid of buttons
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const button = document.createElement("button");
            button.addEventListener("click", () => toggleSquare(i, j));
            board.appendChild(button);
        }
    }
  
    // Function to toggle the state of a square and its neighbors
    function toggleSquare(row, col) {
        const buttons = document.querySelectorAll("button");
        // Start the timer when a button is clicked for the first time
        if (!startTime) {
            startTimer();
          }
        toggleState(buttons[row * 5 + col]);
        toggleState(getButton(row - 1, col));
        toggleState(getButton(row + 1, col));
        toggleState(getButton(row, col - 1));
        toggleState(getButton(row, col + 1));
  
         // Check if the game is solved
    if (isGameSolved()) {
        stopTimer();
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
        window.alert("You win!");
      }
        // Update actual moves
        actualMoves++;
        actualMovesSpan.textContent = actualMoves;
    }
  
    // Function to toggle the state of a button
    function toggleState(button) {
        if (button) {
            button.classList.toggle("is-off");
        }
    }
  
    // Function to get the button at a specific row and column
    function getButton(row, col) {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            return document.querySelectorAll("button")[row * 5 + col];
        }
        return null;
    }
  
    // Function to check if the game is solved
    function isGameSolved() {
        const buttons = document.querySelectorAll("button");
        return Array.from(buttons).every(button => button.classList.contains("is-off"));
    }
    // Function to start the timer
  function startTimer() {
    startTime = Date.now();
    updateTimer(); // Update timer immediately
    setInterval(updateTimer, 1000); // Update timer every second
  }

  // Function to stop the timer
  function stopTimer() {
    startTime = null;
  }

  // Function to update the timer
  function updateTimer() {
    if (startTime) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
      timerSpan.textContent = elapsedTime + 's';
    }
  }
  
    // Randomly set up the initial solvable configuration
    function initializeBoard() {
        for (let i = 0; i < 10; i++) {
            const row = Math.floor(Math.random() * 5);
            const col = Math.floor(Math.random() * 5);
            toggleSquare(row, col);
        }
    }
  
  });