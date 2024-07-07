const questions = [
  {
    question: "Who is the present prime minister of India ?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Akhilesh Yadav", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Keshav Prasad Maurya", correct: false },
    ],
  },
  {
    question: "Who is the father of India ?",
    answers: [
      { text: "Mahatma Gandhi", correct: true },
      { text: "Javahar lal Neharu", correct: false },
      { text: "Narendra Modi", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question: "What is your Name ?",
    answers: [
      { text: "Mr.", correct: true },
      { text: "Ms.", correct: false },
      { text: "Miss.", correct: false },
      { text: "Shree.", correct: false },
    ],
  },
  {
    question: "May God ----- You ?",
    answers: [
      { text: "Bless", correct: false },
      { text: "Unless", correct: false },
      { text: "Help", correct: true },
      { text: "Destroy", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
