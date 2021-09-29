const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const scoredis = document.getElementById("scoreContainer");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

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
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
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

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 45;
const questionTime = 0;
let TIMER;

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

// start quiz, hide start button and display quiz questions. Also start timer
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

// checks the answer and if wrong subtracts time

function checkAnswer(answer) {
  // answer is wrong subtract time
  if (answer !== questions[runningQuestion].correct) {
    count = count - 10;
    
    
  }
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
   
    clearInterval(TIMER);
    scoreRender();
  }
}

// score render
function scoreRender() {
  quiz.style.display = "none";
  scoredis.style.display = "block";
  scoredis.innerHTML += "<p>You scored " + count + " points</p>";
  localStorage.setItem("recentScore", count);
    console.log(count);
 
    
}
  
function saveHS(event) {
  console.log("save button");
  event.preventDefault();
  const initialsInput = document.getElementById("initials"); 
  console.log(initialsInput.value);
  console.log(count);
  const recentScore = localStorage.getItem("recentScore");
  const uScore = {
    score: recentScore,
    name: initialsInput.value,
  };
  highScores.push(uScore);
  highScores.sort(function(a,b){
      return b.score - a.score;
  });
  localStorage.setItem('highScores', JSON.stringify(highScores));
  console.log(highScores);
}
