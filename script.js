/* STOPWATCH VARIABLES */

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

/* DOM ELEMENTS */

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");
const themeToggle = document.getElementById("theme-toggle");


/* Format time: hh:mm:ss.ms */

function timeToString(time) {
  let diffInHrs = Math.floor(time / 3600000);
  let diffInMin = Math.floor((time % 3600000) / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);
  let diffInMs = time % 1000;

  let hours = String(diffInHrs).padStart(2, "0");
  let minutes = String(diffInMin).padStart(2, "0");
  let seconds = String(diffInSec).padStart(2, "0");
  let milliseconds = String(diffInMs).padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/* Update display */

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

/* TIMER FUNCTIONS */

/* Start Timer */

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
  }
}

/* Stop Timer */

function stopTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

/* Reset Timer */

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  lapCounter = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
}

/* Record Lap */

function recordLap() {
  if (isRunning) {
    lapCounter++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
    laps.appendChild(li);
  }
}

/* THEME FUNCTIONS */

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
}

/* Load saved theme on page load */

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light-theme");
    themeToggle.textContent = "🌙";
  }
}

/* EVENT LISTENERS */

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
themeToggle.addEventListener("click", toggleTheme);
window.addEventListener("load", loadTheme);
