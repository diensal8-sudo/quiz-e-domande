// ---------- Data ----------
const QUESTIONS = [
  { q: "Which tag is the biggest heading in HTML?",
    answers: ["<h6>", "<h1>", "<head>", "<title>"], correct: 1 },
  { q: "Which language gives a web page its colors and layout?",
    answers: ["HTML", "JavaScript", "CSS", "SQL"], correct: 2 },
  { q: "Which keyword creates a variable that cannot be reassigned?",
    answers: ["var", "let", "const", "set"], correct: 2 },
  { q: "What does console.log(2 + \"2\") print?",
    answers: ["4", "22", "NaN", "Error"], correct: 1 },
  { q: "Which symbol selects an element by its id in CSS?",
    answers: [".", "#", "*", ">"], correct: 1 },
  { q: "Which method adds an item to the end of an array?",
    answers: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
  { q: "What does === check in JavaScript?",
    answers: ["Only the value", "Only the type", "Value and type", "Nothing"], correct: 2 },
  { q: "Which HTML tag creates a link?",
    answers: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
  { q: "Which event fires when you click an element?",
    answers: ["hover", "press", "click", "tap"], correct: 2 },
  { q: "Where can a small amount of data be saved in the browser?",
    answers: ["localStorage", "console", "<head>", "document.body"], correct: 0 },
];

// ---------- Elements ----------
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
const barFill = document.getElementById("bar-fill");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const resultScoreEl = document.getElementById("result-score");
const resultTextEl = document.getElementById("result-text");
const restartBtn = document.getElementById("restart");

// ---------- State ----------
let questions = [];
let index = 0;
let score = 0;
let answered = false;
let best = loadBest();

// ---------- Best score (localStorage) ----------
function loadBest() {
  try {
    const value = localStorage.getItem("quiz-best");
    return value === null ? null : Number(value);
  } catch (e) {
    return null;
  }
}

function saveBest() {
  try { localStorage.setItem("quiz-best", best); } catch (e) {}
}

function showBest() {
  bestEl.textContent = best === null ? "-" : best;
}

// ---------- Helpers ----------
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------- Game ----------
function startQuiz() {
  questions = shuffle(QUESTIONS);
  index = 0;
  score = 0;
  scoreEl.textContent = 0;
  resultEl.hidden = true;
  quizEl.hidden = false;
  showQuestion();
}

function showQuestion() {
  const current = questions[index];
  answered = false;

  progressEl.textContent = "Question " + (index + 1) + " of " + questions.length;
  barFill.style.width = (index / questions.length) * 100 + "%";
  questionEl.textContent = current.q;
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("bad");
  nextBtn.hidden = true;

  answersEl.innerHTML = "";
  current.answers.forEach((text, i) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = text;
    button.addEventListener("click", () => choose(i));
    answersEl.appendChild(button);
  });
}

function choose(i) {
  if (answered) return;
  answered = true;

  const current = questions[index];
  const buttons = answersEl.children;

  if (i === current.correct) {
    score++;
    scoreEl.textContent = score;
    buttons[i].classList.add("correct");
    feedbackEl.textContent = "Correct!";
  } else {
    buttons[i].classList.add("wrong");
    buttons[current.correct].classList.add("correct");
    feedbackEl.textContent = "Not quite.";
    feedbackEl.classList.add("bad");
  }

  for (const button of buttons) button.disabled = true;
  nextBtn.textContent = index === questions.length - 1 ? "See result" : "Next";
  nextBtn.hidden = false;
}

function next() {
  index++;
  if (index < questions.length) showQuestion();
  else finish();
}

function finish() {
  quizEl.hidden = true;
  resultEl.hidden = false;
  barFill.style.width = "100%";

  if (best === null || score > best) {
    best = score;
    saveBest();
    showBest();
  }

  resultScoreEl.textContent = score + " / " + questions.length;
  if (score === questions.length) resultTextEl.textContent = "Perfect! You know your web basics.";
  else if (score >= questions.length * 0.7) resultTextEl.textContent = "Great job!";
  else if (score >= questions.length * 0.4) resultTextEl.textContent = "Not bad. Try again!";
  else resultTextEl.textContent = "Keep learning, you'll get there.";
}

// ---------- Events ----------
nextBtn.addEventListener("click", next);
restartBtn.addEventListener("click", startQuiz);

document.addEventListener("keydown", (e) => {
  if (!quizEl.hidden) {
    if (["1", "2", "3", "4"].includes(e.key)) {
      const button = answersEl.children[Number(e.key) - 1];
      if (button) button.click();
    }
    if (e.key === "Enter" && !nextBtn.hidden) next();
  } else if (e.key === "Enter") {
    startQuiz();
  }
});

showBest();
startQuiz();