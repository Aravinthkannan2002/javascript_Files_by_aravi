document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json') // Make a GET request to the JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            const titlesList = document.getElementById('titles'); // Target the UL element

            // Iterate over the JSON data and append each title to the UL
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.title;
                titlesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});