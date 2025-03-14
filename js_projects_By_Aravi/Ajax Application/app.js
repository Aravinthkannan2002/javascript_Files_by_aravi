document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open('GET', 'data.json', true); // Initialize the request (true means asynchronous)

    // Define what happens when the response is received
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Parse the JSON response
            var jsonData = JSON.parse(xhr.responseText);

            // Get the target element where titles will be displayed
            var titlesList = document.getElementById('titles');

            // Loop through the JSON data and create list items for each title
            jsonData.forEach(function(item) {
                var listItem = document.createElement('li');
                listItem.textContent = item.title;
                titlesList.appendChild(listItem);
            });
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        console.error('Network error occurred.');
    };

    // Send the request
    xhr.send();
});