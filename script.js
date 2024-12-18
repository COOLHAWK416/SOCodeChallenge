const morseCode = {
    A: "●–", B: "–●●●", C: "–●–●", D: "–●●", E: "●", F: "●●–●", G: "––●",
    H: "●●●●", I: "●●", J: "●–––", K: "–●–", L: "●–●●", M: "––", N: "–●",
    O: "–––", P: "●––●", Q: "––●–", R: "●–●", S: "●●●", T: "–", U: "●●–",
    V: "●●●–", W: "●––", X: "–●●–", Y: "–●––", Z: "––●●",
    "1": "●––––", "2": "●●–––", "3": "●●●––", "4": "●●●●–", "5": "●●●●●",
    "6": "–●●●●", "7": "––●●●", "8": "–––●●", "9": "––––●", "0": "–––––"
  };
  
  const morseToText = Object.keys(morseCode).reduce((acc, letter) => {
    acc[morseCode[letter]] = letter;
    return acc;
  }, {});
  
  let currentCipher = "";
 // let timer;
  //let timeLeft = 120;
  let score = 0;
  let originalMessage = "";  // Variable to store the original message
  let decipherCode = "";
  let randomKeyword = "";
  let messages = [];
  
  // Generate a random cipher message
  function generateCipher() {
    clearPractice();
    const message = randomMessage();  // Generate random message
    originalMessage = message;  // Store the original message
    currentCipher = textToFractionatedMorse(message);  // Convert message to fractionated Morse code
    document.getElementById("cipherOutput").textContent = currentCipher;  // Display cipher (Morse code)
    updateTable(currentCipher);
    // Example usage: Generate all combinations of length 3
    // const length = 3;
    // const allCombinations = generateCombinations(length);
    // Get reference to the header cells in the combination table
    const rowHeader = document.getElementById("rowHeader");
    // Get all the div elements inside rowHeader
    const headerCells = rowHeader.querySelectorAll('th');
    // Loop through each header cell and clear its content
    headerCells.forEach(function (headerCell) {
      headerCell.textContent = '';  // Clear the text content
    });
  }
  //  Define a list of possible keywords
  const keywordList = ["HELLO", "MORSE CODE", "PRACTICE", "DECIPHER", "STUDENTS", "BETWEEN", "COMPUTER", "SCIENCE", "TEACHER", "SCHOOL","EMPATHY","PRESUME"];

// Function to pick a random keyword from the list
function getRandomKeyword() {
    const randomIndex = Math.floor(Math.random() * keywordList.length); // Generate a random index
    return keywordList[randomIndex]; // Return the keyword at that index
}

  // Randomly select a message to encode
  function randomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  function loadMessages() {
    fetch('Messages.txt')
        .then(response => response.text()) // Read the file contents as text
        .then(fileContents => {
            messages = fileContents.split('\n'); // Split by newline to get individual messages
        })
        .catch(error => console.error('Error loading messages:', error));
}

// Call loadMessages when the page is ready
window.onload = function() {
  loadMessages();  // Load the messages from the file
  //generateMorseCodeChart0to9(); // Generate the 0-9 chart
  generateMorseCodeChartAtoM(); // Generate the A-M chart
  generateMorseCodeChartNtoZ(); // Generate the N-Z chart
};


function showKeyword() {
    document.getElementById("keywordDisplay").textContent = `Keyword: ${randomKeyword}`;
}
  
  
  // Convert text to fractionated Morse code
// Convert text to Fractionated Morse code
function textToFractionatedMorse(text) {
    let fractionatedMorse = '';
    let chunks = [];
    let words = text.split(' ');
  
    // Loop through each word in the input
    words.forEach((word, index) => {
      let wordMorse = '';
      
      // Loop through each letter in the word
      word.split('').forEach((letter, letterIndex) => {
        const letterMorse = morseCode[letter.toUpperCase()];
        
        // Add letter's Morse code
        if (letterIndex > 0) {
          wordMorse += 'X';  // Add space between letters (one X)
        }
        wordMorse += letterMorse;
      });
  
      // After encoding the word, check if it's not the last word
      if (index < words.length - 1) {
        wordMorse += 'XX';  // Add space between words (two Xs)
      }
  
      fractionatedMorse += wordMorse;
    });
    if (fractionatedMorse.length % 3 !== 0) {  
      // If the number of characters is not divisible by three then 'x' is added to the end of the morse code and, if necessary a '.' is added
      fractionatedMorse += 'X';
      if (fractionatedMorse.length % 3 !== 0) {
        fractionatedMorse += '.';
      }
    }
    // Split the string into chunks of 3 characters
    morseChunks = splitByLength(fractionatedMorse, 3);
    // Use the random keyword
    randomKeyword = getRandomKeyword();
    const keyMap = generateKeyMap(randomKeyword);

    // Display the encoded message using the keymap
    let encodedMessage = '';
    // Reverse the keymap
    const reversedKeyMap = reverseKeyMap(key);
    morseChunks.forEach(chunk => {
    // Find the letter that corresponds to this Morse chunk 
      if (reversedKeyMap[chunk]) {
        encodedMessage += reversedKeyMap[chunk]; // Use keymap to encode
      }
  });
    return encodedMessage;
  }

  function splitByLength(text, length) {
    // Use regular expression to split the string into chunks of 'length'
    let result = text.match(new RegExp('.{1,' + length + '}', 'g'));
    return result;
  }

  // Start the countdown timer
  // function startTimer() {
  //   timeLeft = 120;
  //   document.getElementById("timeRemaining").textContent = timeLeft;
  //   timer = setInterval(function() {
  //     timeLeft--;
  //     document.getElementById("timeRemaining").textContent = timeLeft;
  //     if (timeLeft <= 0) {
  //       clearInterval(timer);
  //       document.getElementById("feedback").textContent = "Time's up!";
  //       checkAnswer();  // Automatically check the answer when time runs out
  //     }
  //   }, 1000);
  // }
  
  // Check the student's decoded answer
  function checkAnswer() {
    let userInput = document.getElementById("decodedInput").value.trim();  // Get the user's input
    let correctAnswer = originalMessage.trim();  // The original message is the correct answer
    if (userInput.toUpperCase() === correctAnswer.toUpperCase()) {
      score++;
      document.getElementById("feedback").textContent = "Correct! Well done.";
      document.getElementById("feedback").style.color = "green";
    } else {
      document.getElementById("feedback").textContent = "Incorrect. Try again!";
      document.getElementById("feedback").style.color = "red";
    }
  
    // Show the decoded message (whether correct or incorrect)
    document.getElementById("decodedText").textContent = correctAnswer;
    document.getElementById("score").textContent = `Score: ${score}`;  // Update score
    clearInterval(timer);  // Stop the timer
  }
  
  // Clear the practice session and reset everything
  function clearPractice() {
    usedCharacters= new Map();
    randomKeyword = "";
    clearInterval(timer);  // Stop the timer
    timeLeft =120;  // Reset the timer to 120 seconds
    //document.getElementById("timeRemaining").textContent = timeLeft;
    document.getElementById("cipherOutput").textContent = "";
    document.getElementById("decodedInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("decodedText").textContent = "";
    document.getElementById("score").textContent = `Score: ${score}`;
    const container = document.getElementById('letterContainer');
    container.innerHTML = ''; 
    document.getElementById("hintDisplay").textContent = "";
    document.getElementById("keywordDisplay").textContent = "";
    document.getElementById("startTimer").textContent = "Start Timer"; 
    document.getElementById("startTimer").style.color = 'white'; 
    document.getElementById('decodedOutput').textContent = "";
  }


 // Function to generate all combinations of 'X', '.', and '-' with a length of exactly 3, excluding 'XXX'
 function generateCombinations(length) {
    const symbols = ['●', '–', 'X'];
    const combinations = [];

    // Helper function for generating combinations recursively
    function generate(currentCombination) {
      // If the combination has reached the desired length, add it to the result
      if (currentCombination.length === length) {
        // Only add to combinations if it's not 'XXX'
        if (currentCombination !== 'XXX') {
          combinations.push(currentCombination);
        }
        return;
      }

      // Recursively build combinations by adding one symbol at a time
      for (let symbol of symbols) {
        generate(currentCombination + symbol);
      }
    }

    // Start the recursive generation with an empty string
    generate('');
    return combinations;
  }

      // Example usage: Generate all combinations with a length of 3 (excluding 'XXX')
      const length = 3;
      const allCombinations = generateCombinations(length);
      // Set to track the characters used in header cells
      let usedCharacters = new Map();
  
      // Function to sort and categorize the combinations
      function categorizeCombinations(combinations) {
        const dotsGroup = [];
        const hyphenGroup = [];
        const xGroup = [];
        const firstDotGroup = [];
  
        combinations.forEach(combination => {
           if (combination.startsWith('●')) {
            firstDotGroup.push(combination);
          } else if (combination.startsWith('–')) {
            hyphenGroup.push(combination);
          } else if (combination.startsWith('X')) {
            xGroup.push(combination);
          }
        });
  
        // Merge the groups to form the final ordered list
        return [...dotsGroup, ...firstDotGroup, ...hyphenGroup, ...xGroup];
      }
  // Function to display the combinations in columns
  function displayMapping() {
    const rowHeader = document.querySelector("#rowHeader");
    const row1 = document.querySelector("#row1");
    const row2 = document.querySelector("#row2");
    const row3 = document.querySelector("#row3");

    // Categorize combinations based on the first symbol
    const sortedCombinations = categorizeCombinations(allCombinations);

    // Loop through all sorted combinations and display them
    sortedCombinations.forEach((combination, index) => {
      // Create a new table cell for each combination
      const headerCell = document.createElement("th");
      headerCell.setAttribute("contenteditable", "true");
      headerCell.textContent = "";  // Empty, editable header for user input
      rowHeader.appendChild(headerCell);

      // Create a new table cell (column) for each combination in the respective rows
      const cell1 = document.createElement("td");
      cell1.textContent = combination.charAt(0);  // First character
      row1.appendChild(cell1);

      const cell2 = document.createElement("td");
      cell2.textContent = combination.charAt(1);  // Second character
      row2.appendChild(cell2);

      const cell3 = document.createElement("td");
      cell3.textContent = combination.charAt(2);  // Third character
      row3.appendChild(cell3);
    });
     // Add input event listeners to the row header cells (th)
     document.querySelectorAll('#rowHeader th').forEach((header, index) => {
      // Handle input event (text entered)
      header.addEventListener('input', function() {
        let headerText = '';
        let combinedString = '';
        // Limit the length of text entered to 1 character
        if (header.textContent.length > 1) {
          header.textContent = header.textContent.charAt(0); // Keep only the first character
        }
        // usedCharacters.forEach((value, key) => {
        //   console.log(`Index: ${key}, Character: ${value}`);
        // });
        if (header.textContent === '') {
          headerText=usedCharacters.get(index);
          usedCharacters.set(index,null); // Remove from map if character is cleared
          combinedString = '';
        } else {
            // Check if the entered character already exists in the map (across all indexes)
          let isCharacterUsed = false; 
            for (let value of usedCharacters.values()) {
              if (value === header.textContent && value !== usedCharacters.get(index)) {
                isCharacterUsed = true;
                break;
              }
            } 
            // If the character entered is already used, clear the input and alert
          if (isCharacterUsed) {
            header.textContent = ''; // Clear the input
            alert("This character has already been assigned. Please choose a different one.");
          } else {
            // Otherwise, add the character to the used set
            usedCharacters.set(index,header.textContent);
          }
        headerText = header.textContent;
       // console.log(`Text entered in header: ${headerText}`);

        // Now, based on the entered text, pick the corresponding rows
        const row1Cells = row1.children;
        const row2Cells = row2.children;
        const row3Cells = row3.children;

        // Search for the entered text in the header
        // Use the `index` to get the corresponding columns from the rows
        const row1Value = row1Cells[index].textContent;
        const row2Value = row2Cells[index].textContent;
        const row3Value = row3Cells[index].textContent;

       // Combine the values from row1, row2, and row3 into a single string
        combinedString = `${row1Value} ${row2Value} ${row3Value}`;
      }
       updateTextField(headerText.toUpperCase(),combinedString);
      // Display the decoded string (based on current table values)
      displayDecodedOutput();
      });
      // Function to update the text field in the target table based on entered letter
      function updateTextField(letter, combinedString) {
       // Get the container for the letters and inputs
        const container = document.getElementById('letterContainer');
        // Get all the span elements in the letter container
        const letterSpans = container.querySelectorAll('span');
      // Loop through the span elements to find the one that matches the letter
      letterSpans.forEach(function (span) {
        if (span.textContent === letter) {
          // Find the input field next to the letter span
          const inputField = span.nextElementSibling;
          // Update the value of the input field (empty it if letter is cleared)
          if (letter) {
            inputField.value = `${combinedString}`;  // Set the value based on the entered letter
          } else {
            inputField.value = '';  // Clear the input field if the letter is cleared
          }
        }
      });
      }
    });
  }
// Function to combine the values from all encoded input text fields into a single string
function displayDecodedOutput() {
  // Get the container for decoded output (e.g., a div or input element)
  const decodedOutputContainer = document.getElementById('decodedOutput'); // Ensure this container exists
  // Get all input fields inside the letterContainer
  const inputFields = document.querySelectorAll('#letterContainer input');
  
  // Initialize an empty array to store the values
  let combinedString = '';

  // Loop through each input field
  inputFields.forEach(input => {
    if (input.value.trim() === '') {
      combinedString += '000';
    }else if (input.value) {
      // Add the value of the input field to the combined string, with a space separator
      combinedString += input.value;
    }
  });

  // Trim the last space from the string (optional)
  combinedString = combinedString.trim();

  // Log the combined string to the console
  console.log('Combined String:', combinedString);

  // Update the decoded output container with the current decoded string
  decodedOutputContainer.textContent = combinedString.trim();
}
//   // Function to display the decoded output
// function displayDecodedOutput() {
//   // Get the container for decoded output (e.g., a div or input element)
//   const decodedOutputContainer = document.getElementById('decodedOutput'); // Ensure this container exists

//   // Loop through the usedCharacters map to build the decoded string
//   let decodedString = '';
//   for (let [index, character] of usedCharacters.entries()) {
//     const row1Value = row1.children[index].textContent;
//     const row2Value = row2.children[index].textContent;
//     const row3Value = row3.children[index].textContent;

//     // Combine the row values into a string
//     decodedString += `${row1Value} ${row2Value} ${row3Value} `;
//   }

//   // Update the decoded output container with the current decoded string
//   decodedOutputContainer.textContent = decodedString.trim();
// }
  // List of all possible combinations (symbols)
const sortedCombinations = categorizeCombinations(allCombinations);
// Store the generated key
let key = {};

// Function to generate the key based on a predefined keyword
function generateKeyMap(keyword) { 
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const usedCombinations = new Set();
  let keyMap = {};

  // First, assign combinations to the letters in the keyword
  let index = 0;
  for (let i = 0; i < keyword.length; i++) {
    const letter = keyword[i];
    if (alphabet.includes(letter) && !usedCombinations.has(letter)) {
      keyMap[letter] = sortedCombinations[index];
      usedCombinations.add(letter);
      index++;
    }
  }

  // Then, assign the remaining letters to unused combinations
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    if (!usedCombinations.has(letter)) {
      keyMap[letter] = sortedCombinations[index];
      usedCombinations.add(letter);
      index++;
    }
  }

  // Set the global key variable
  key = keyMap;
  //console.log("Generated Key: ", key);
}
// Function to reverse the keymap (Morse code as key and letter as value)
function reverseKeyMap(keyMap) {
    const reversedMap = {};
    for (let letter in keyMap) {
      reversedMap[keyMap[letter]] = letter;  // Reverse the key-value pairs
    }
    return reversedMap;
  }

  function updateTable(encodedMessage) {
    // Get the input string value
    const inputString = encodedMessage;
    
    // Get the container for the letters and inputs
    const container = document.getElementById('letterContainer');
    
    // Clear the container
    container.innerHTML = '';
    
    // Loop through each letter in the string and create a flex item for each
    for (let i = 0; i < inputString.length; i++) {
        const letterBox = document.createElement('div');
        letterBox.classList.add('letter-box');
        
        // Create and append the letter span
        const letterSpan = document.createElement('span');
        letterSpan.textContent = inputString[i];
        letterBox.appendChild(letterSpan);
        
        // Create and append the input field for the second row
        const input = document.createElement('input');
        input.type = 'text';
        letterBox.appendChild(input);
        
        // Append the letter box to the container
        container.appendChild(letterBox);
    }
}
function getRandomHintNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to display the hint based on the selected option
function showHint() {
  // Get the selected hint type
  const hintType = document.getElementById('hintSelect').value;
  let hint = '';

  const numChars = getRandomHintNumber(4, 7);

  if (hintType === 'start') {
    hint = `The message starts with: ${originalMessage.substring(0, numChars)}`;
  } else if (hintType === 'end') {
    hint = `The message ends with: ${originalMessage.slice(-numChars)}`;
  }

  // Display the hint
  document.getElementById('hintDisplay').textContent = hint;
}

// Display the combination mapping on page load
displayMapping();

