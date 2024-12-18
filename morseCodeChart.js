// Function to generate the Morse Code chart for numbers 0-9
function generateMorseCodeChart0to9() {
  const chartContainer = document.getElementById('morseCodeChart0to9');

  // Create a table element
  const table = document.createElement('table');

  // Create the table header row
  const headerRow = document.createElement('tr');
  const charHeader = document.createElement('th');
  charHeader.textContent = 'Character';
  const morseHeader = document.createElement('th');
  morseHeader.textContent = 'Morse Code';
  headerRow.appendChild(charHeader);
  headerRow.appendChild(morseHeader);
  table.appendChild(headerRow);

  // Loop through the Morse code map (0-9)
  for (let char in morseCode) {
    if (char >= '0' && char <= '9') {
      const row = document.createElement('tr');

      const charCell = document.createElement('td');
      charCell.textContent = char;

      const morseCell = document.createElement('td');
      morseCell.textContent = morseCode[char];

      row.appendChild(charCell);
      row.appendChild(morseCell);
      table.appendChild(row);
    }
  }

  // Append the table to the chart container for 0-9
  chartContainer.appendChild(table);
}

// Function to generate the Morse Code chart for characters A-M
function generateMorseCodeChartAtoM() {
  const chartContainer = document.getElementById('morseCodeChartAtoM');

  // Create a table element
  const table = document.createElement('table');

  // Create the table header row
  const headerRow = document.createElement('tr');
  const charHeader = document.createElement('th');
  charHeader.textContent = 'Character';
  const morseHeader = document.createElement('th');
  morseHeader.textContent = 'Morse Code';
  headerRow.appendChild(charHeader);
  headerRow.appendChild(morseHeader);
  table.appendChild(headerRow);

  // Loop through the Morse code map (A-M)
  for (let char in morseCode) {
    if (char >= 'A' && char <= 'M') {
      const row = document.createElement('tr');

      const charCell = document.createElement('td');
      charCell.textContent = char;

      const morseCell = document.createElement('td');
      morseCell.textContent = morseCode[char];

      row.appendChild(charCell);
      row.appendChild(morseCell);
      table.appendChild(row);
    }
  }

  // Append the table to the chart container for A-M
  chartContainer.appendChild(table);
}

// Function to generate the Morse Code chart for characters N-Z
function generateMorseCodeChartNtoZ() {
  const chartContainer = document.getElementById('morseCodeChartNtoZ');

  // Create a table element
  const table = document.createElement('table');

  // Create the table header row
  const headerRow = document.createElement('tr');
  const charHeader = document.createElement('th');
  charHeader.textContent = 'Character';
  const morseHeader = document.createElement('th');
  morseHeader.textContent = 'Morse Code';
  headerRow.appendChild(charHeader);
  headerRow.appendChild(morseHeader);
  table.appendChild(headerRow);

  // Loop through the Morse code map (N-Z)
  for (let char in morseCode) {
    if (char >= 'N' && char <= 'Z') {
      const row = document.createElement('tr');

      const charCell = document.createElement('td');
      charCell.textContent = char;

      const morseCell = document.createElement('td');
      morseCell.textContent = morseCode[char];

      row.appendChild(charCell);
      row.appendChild(morseCell);
      table.appendChild(row);
    }
  }

  // Append the table to the chart container for N-Z
  chartContainer.appendChild(table);
}

// Function to toggle the visibility of the chart sections
function toggleChart(sectionId) {
  const sectionContent = document.getElementById(sectionId).querySelector('.chart-content');
  
  // Toggle the 'show' class to show or hide the section content
  sectionContent.classList.toggle('show');
}