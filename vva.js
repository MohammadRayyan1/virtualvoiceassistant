const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const toggleSwitch = document.getElementById('mode-toggle');
const body = document.body;
const modeLabel = document.getElementById('mode-label');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Rayyan...How may I help you?");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Rayyan...How may I help you?");
    } else {
        speak("Good Evening Rayyan...How may I help you?");
    }
}

window.addEventListener('load', () => {
    // if (!localStorage.getItem('initialized')) {
        speak("Initializing, PLEASE WAIT a moment...");
        // localStorage.setItem('initialized', 'true');
        wishMe();
    // }
});


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
}); 


function takeCommand(message) {
    updateHistory(message);
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes('wish me') || message.includes('please wish me')) {
        wishMe();
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com", "_blank");
        speak("Opening Whatsapp...");
    } else if (message.includes("open twitter")) {
        window.open("https://twitter.com", "_blank");
        speak("Opening Twitter...");
    } else if (message.includes("open linkedin")) {
        window.open("https://in.linkedin.com", "_blank");
        speak("Opening LinkedIn...");
    } else if (message.includes("open zoom")) {
        window.open("https://zoom.us", "_blank");
        speak("Opening Zoom...");
    } else if (message.includes("open github")) {
        window.open("https://github.com/", "_blank");
        speak("Opening Github...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes('please tell me your name') || message.includes('your name please')) {
        speak("Hello Sir, I am Virtual Buddy.");
    } else if (message.includes("show history") || message.includes("please show me the history")) {
        displayHistory();
    } else if (message.includes('thank you') || message.includes('thanks for the information')) {
        speak("It's my pleasure, Feel free to come again!!"); 
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        // window.speechSynthesis.cancel();
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}


toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        modeLabel.textContent = "Night Mode";
    } else {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        modeLabel.textContent = "Day Mode";
    }
});

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    console.log("Available Voices:", voices); // Debugging: This will show the loaded voices in the console
};

// Checking which radio button is selected

const voiceRadioButtons = document.querySelectorAll('input[name="voice"]');

function getSelectedVoice() {
    const selectedVoice = document.querySelector('input[name="voice"]:checked').value;
    return selectedVoice; // Returns 'male' or 'female'
}


window.speechSynthesis.cancel();
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    const selectedVoice = getSelectedVoice();
    
    if (selectedVoice === 'female') {
        text_speak.voice = voices.find(voice => voice.name.includes('Microsoft Zira - English (United States)'));
    } else {
        text_speak.voice = voices.find(voice => voice.name.includes('Microsoft Mark - English (United States)'));
    }

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

// HISTORY

let questionHistory = JSON.parse(localStorage.getItem('questionHistory')) || [];

function updateHistory(message) {
    if (questionHistory.length >= 10) {
        questionHistory.shift(); // Remove the oldest entry if history exceeds 100
    }
    questionHistory.push(message);
    localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
}

function displayHistory() {
    let historyContent = '';
    questionHistory.forEach((question, index) => {
        historyContent += `${index + 1}. ${question}\n`;
    });
    alert(historyContent); // Display in a pop-up (you can customize this part)
}