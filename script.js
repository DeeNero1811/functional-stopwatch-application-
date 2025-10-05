// Stopwatch variables
let timer;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let lapCount = 0;

// DOM elements
const display = document.getElementById("display");
const toggleBtn = document.getElementById("toggleBtn");
const clearBtn = document.getElementById("clearBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Format time display
function formatTime() {
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  const ms = String(Math.floor(milliseconds / 10)).padStart(2, "0");
  return `${h}:${m}:${s}.${ms}`;
}

function updateDisplay() {
  display.textContent = formatTime();
}

// Start/Stop button
toggleBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    toggleBtn.textContent = "Stop";
    timer = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
  } else {
    isRunning = false;
    toggleBtn.textContent = "Start";
    clearInterval(timer);
  }
});

// Reset button
clearBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  lapCount = 0;
  lapsList.innerHTML = "";
  toggleBtn.textContent = "Start";
  updateDisplay();
});

// Lap button
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime()}`;
    lapsList.prepend(li);
  }
});

// THEME TOGGLE
themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    themeToggle.textContent = "🌙";
  }
});

updateDisplay();
