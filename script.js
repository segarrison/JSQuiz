const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const scoredis = document.getElementById("scoreContainer");

// create array of question objects
let questions = [
  {
    question: "Commonly used data types do NOT include:",
    choiceA: "alerts",
    choiceB: "numbers",
    choiceC: "strings",
    choiceD: "booleans",
    correct: "A",
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choiceA: "Square brackets",
    choiceB: "Double or single quotes",
    choiceC: "Curly brackets",
    choiceD: "Angled brackets",
    correct: "B",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    choiceA: "Numbers and Strings",
    choiceB: "Other arrays",
    choiceC: "Booleans",
    choiceD: "All of the above",
    correct: "D",
  },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 45;
const questionTime = 0;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// counter render

function renderCounter() {
  if (count >= questionTime) {
    counter.innerHTML = count;

    count--;
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score = score + 10;
  } 
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// score render
function scoreRender() {
  quiz.style.display = "none";
  scoredis.style.display = "block";
  scoredis.innerHTML += "<p>You scored " + score + " points</p>";
}
