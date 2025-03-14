window.addEventListener('DOMContentLoaded', () => {
  // Check browser support
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support the Speech Recognition API. Please try Chrome, Edge, or Safari.');
      document.getElementById('start-btn').disabled = true;
      return;
  }
  
  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  // DOM elements
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const clearBtn = document.getElementById('clear-btn');
  const statusEl = document.getElementById('status');
  const wordsEl = document.getElementById('words');
  const interimEl = document.getElementById('interim');
  const accuracyEl = document.getElementById('accuracy');
  const languageSelect = document.getElementById('language');
  
  // Recognition settings
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = languageSelect.value;
  
  // Variables
  let isListening = false;
  let finalTranscript = '';
  
  // Event listeners
  startBtn.addEventListener('click', startListening);
  stopBtn.addEventListener('click', stopListening);
  clearBtn.addEventListener('click', clearText);
  languageSelect.addEventListener('change', () => {
      recognition.lang = languageSelect.value;
      if (isListening) {
          stopListening();
          startListening();
      }
  });
  
  // Functions
  function startListening() {
      finalTranscript = wordsEl.textContent;
      recognition.start();
      isListening = true;
      
      startBtn.disabled = true;
      stopBtn.disabled = false;
      
      statusEl.innerHTML = '<span class="pulse"></span>Listening...';
      statusEl.classList.add('listening');
  }
  
  function stopListening() {
      recognition.stop();
      isListening = false;
      
      startBtn.disabled = false;
      stopBtn.disabled = true;
      
      statusEl.textContent = 'Not listening';
      statusEl.classList.remove('listening');
      interimEl.textContent = '';
  }
  
  function clearText() {
      finalTranscript = '';
      wordsEl.textContent = '';
      interimEl.textContent = '';
      accuracyEl.textContent = '';
  }
  
  // Recognition events
  recognition.onresult = (event) => {
      let interimTranscript = '';
      let highestConfidence = 0;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (confidence > highestConfidence) {
              highestConfidence = confidence;
          }
          
          if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
          } else {
              interimTranscript += transcript;
          }
      }
      
      wordsEl.textContent = finalTranscript;
      interimEl.textContent = interimTranscript;
      
      if (highestConfidence > 0) {
          const confidencePercentage = Math.round(highestConfidence * 100);
          accuracyEl.textContent = `Confidence: ${confidencePercentage}%`;
      }
  };
  
  recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech') {
          statusEl.textContent = 'No speech detected. Try again.';
      } else if (event.error === 'audio-capture') {
          statusEl.textContent = 'No microphone detected or access denied.';
      } else if (event.error === 'not-allowed') {
          statusEl.textContent = 'Microphone access denied. Check permissions.';
      } else {
          statusEl.textContent = `Error: ${event.error}`;
      }
      
      stopListening();
  };
  
  recognition.onend = () => {
      if (isListening) {
          recognition.start();
      }
  };
});