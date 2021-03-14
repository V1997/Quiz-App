const quizData = [
  {
    question: "how old is our PM?",
    a: "69",
    b: "80",
    c: "70",
    d: "71",
    correct: "c"
  },
  {
    question: "Most popular programming language in 2020?",
    a: "python",
    b: "java",
    c: "javascript",
    d: "dart",
    correct: "a"
  },
  {
    question: "Who was the 35th president of the usa?",
    a: "Donald trump",
    b: "Barak Obama",
    c: "bill clineton",
    d: "John F canady",
    correct: "d"
  },
  {
    question: "In which state of prime minister of india belongs",
    a: "Gujarat",
    b: "Maharastra",
    c: "Rajasthan",
    d: "Mmadhya Pradesh",
    correct: "a"
  }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

let currentQuiz = 0;
let score = 0;
let notAttempted = 0;
var timeleft = 10;
var downloadTimer;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  getTimer();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getTimer() {
  clearInterval(downloadTimer);
  downloadTimer = setInterval(function () {
    if (timeleft <= -1) {
      clearInterval(downloadTimer);
      nextQuestion();
    } else {
      document.getElementById("countdown").innerHTML = timeleft + "'s";
    }
    timeleft -= 1;
  }, 1000);
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function nextQuestion() {
  // check to see the answer
  const answer = getSelected();
  timeleft = 10;
  // if (answer) {
  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  if (answer === undefined) {
    notAttempted++;
  }

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} <br/> Not Attempted Questions: ${notAttempted}.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
  }
}
