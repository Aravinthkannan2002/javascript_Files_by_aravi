// script.js

// Tab Switching Logic
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and tab contents
        document.querySelectorAll('.tab, .tab-content').forEach(element => {
            element.classList.remove('active');
        });

        // Add active class to the clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Generate Popup Code
document.getElementById('generate-btn').addEventListener('click', () => {
    generateCode();
    document.querySelector('.code-output').style.display = 'block';
});

// Preview Popup
document.getElementById('preview-btn').addEventListener('click', () => {
    const popup = generatePopup();
    const previewContainer = document.getElementById('popup-preview');
    previewContainer.innerHTML = popup;
    previewContainer.style.display = 'flex';

    // Close popup on overlay click if enabled
    if (document.getElementById('close-on-overlay').checked) {
        previewContainer.addEventListener('click', (e) => {
            if (e.target === previewContainer) {
                previewContainer.style.display = 'none';
            }
        });
    }

    // Close popup on close button click if enabled
    const closeButton = document.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            previewContainer.style.display = 'none';
        });
    }

    // Auto-close popup if enabled
    const autoCloseTime = parseInt(document.getElementById('auto-close').value, 10);
    if (autoCloseTime > 0) {
        setTimeout(() => {
            previewContainer.style.display = 'none';
        }, autoCloseTime * 1000);
    }
});

// Copy Code to Clipboard
document.querySelector('.copy-btn').addEventListener('click', () => {
    const code = document.getElementById('all-output').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
});

// Helper Functions
function generatePopup() {
    // ... (see full code above)
}

function generateCode() {
    // ... (see full code above)
}

 
     
 