let timeLeft =120; // Starting time for the timer (in seconds)
let timer; // This will store the timer ID

// Start the countdown timer
function startTimer() {
    timeLeft = 120;  // Reset to 60 seconds whenever the timer starts
    updateTimerDisplay(timeLeft); // Update the display with the initial time
    document.getElementById("decodedInput").disabled = false; // Enable input once the timer starts
    timer = setInterval(function() {
        timeLeft--; // Decrease the time by 1 second
        updateTimerDisplay(timeLeft); // Update the displayed time
        // If time reaches 0, stop the timer and check the answer automatically
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            document.getElementById("startTimer").style.color = 'red';  // Change button text color to red
            document.getElementById("startTimer").textContent = "Time's up!";  // Show "Time's up!" on the button
            document.getElementById("feedback").textContent = "Time's up!";
            document.getElementById("feedback").style.color = "#ff0000"; // Time's up in red
            checkAnswer(); // Automatically check the answer when time runs out
        }
    }, 1000); // Run every 1000 milliseconds (1 second)
}

// Function to update the timer display
function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60); // Get the minutes
    const seconds = timeInSeconds % 60; // Get the seconds
    document.getElementById("startTimer").textContent = formatTime(minutes, seconds);
}

// Function to format the time into mm:ss
function formatTime(minutes, seconds) {
    const minuteString = minutes < 10 ? '0' + minutes : minutes;
    const secondString = seconds < 10 ? '0' + seconds : seconds;
    return `${minuteString}:${secondString}`;
}
