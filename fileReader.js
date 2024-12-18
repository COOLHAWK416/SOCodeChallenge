function loadMessages() {
    fetch('Messages.txt')
        .then(response => response.text()) // Read the file contents as text
        .then(fileContents => {
            const messages = fileContents.split('\n'); // Split by newline to get individual messages

            document.getElementById('originalMessage').textContent = "Original Message: " + randomMessage;
        })
        .catch(error => console.error('Error loading messages:', error));
    return messages
}

// Call loadMessages when the page is ready
window.onload = loadMessages;