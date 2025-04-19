// Quiz Data
const quizData = [
  {
    question: "What is one of the key effects of excessive screen time on adolescents' language skills?",
    type: "single",
    answers: [
      { text: "Improved vocabulary", correct: false },
      { text: "Reduced time for reading", correct: true },
      { text: "Increased reading time", correct: false },
      { text: "Improved memory retention", correct: false }
    ]
  },
  {
    question: "How does screen time affect adolescents' social behavior?",
    type: "single",
    answers: [
      { text: "Increases their ability to communicate effectively", correct: false },
      { text: "Leads to social isolation and poor communication skills", correct: true },
      { text: "Enhances their social relationships", correct: false },
      { text: "Encourages more face-to-face interactions", correct: false }
    ]
  },
  {
    question: "Which brain area is affected by violent video games, leading to reduced activation?",
    type: "single",
    answers: [
      { text: "Frontal brain regions", correct: true },
      { text: "Temporal lobes", correct: false },
      { text: "Hippocampus", correct: false },
      { text: "Occipital lobe", correct: false }
    ]
  },
  {
    question: "What is one of the mental health challenges linked to prolonged screen use in adolescents?",
    type: "single",
    answers: [
      { text: "Increased cognitive flexibility", correct: false },
      { text: "Decreased anxiety levels", correct: false },
      { text: "Increased depression and anxiety", correct: true },
      { text: "Improved sleep quality", correct: false }
    ]
  },
  {
    question: "What effect does excessive screen time have on brain volume in adolescents?",
    type: "single",
    answers: [
      { text: "Increases brain volume", correct: false },
      { text: "Has no effect on brain volume", correct: false },
      { text: "Reduces brain volume", correct: true },
      { text: "Increases gray matter volume", correct: false }
    ]
  },
  {
    question: "What is one way to balance screen time and promote healthier cognitive development in adolescents?",
    type: "single",
    answers: [
      { text: "Allow unlimited screen time to improve brain activity", correct: false },
      { text: "Encourage more outdoor and physical activities", correct: true },
      { text: "Decrease sleep time for more screen time", correct: false },
      { text: "Limit all screen time entirely", correct: false }
    ]
  },
  {
    question: "Which therapy has become the go-to treatment for improving day-to-day life and is recommended for adolescents with mental health issues?",
    type: "single",
    answers: [
      { text: "Psychoanalysis", correct: false },
      { text: "Cognitive Behavioral Therapy (CBT)", correct: true },
      { text: "Hypnotherapy", correct: false },
      { text: "Group therapy", correct: false }
    ]
  },
  {
    question: "What is one of the behavioral issues linked to excessive gaming?",
    type: "single",
    answers: [
      { text: "Increased emotional regulation", correct: false },
      { text: "Higher levels of aggression and attention problems", correct: true },
      { text: "Improved time management", correct: false },
      { text: "Enhanced impulse control", correct: false }
    ]
  }
];

// DOM Elements (updated)
const quizForm = document.getElementById('quiz-form');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.querySelector('.progress-bar');
const resultsModal = new bootstrap.Modal(document.getElementById('results-modal'));
const finalScoreDisplay = document.getElementById('final-score');
const totalQuestionsFinal = document.getElementById('total-questions');
const answerFeedback = document.getElementById('answer-feedback');

// Quiz State
let currentQuestion = 0;
const userAnswers = [];

// Initialize Quiz
function initQuiz() {
renderQuestion();
updateButtons();
updateProgress();
}

// Render Current Question (unchanged)
function renderQuestion() {
quizForm.innerHTML = '';
const question = quizData[currentQuestion];

const questionDiv = document.createElement('div');
questionDiv.className = 'question active';

const questionHTML = `
  <h2>${currentQuestion + 1}. ${question.question}</h2>
  <div class="answers">
    ${question.answers.map((answer, index) => `
      <div class="answer-option">
        <label>
          <input 
            type="radio" 
            name="answer" 
            value="${index}"
            ${userAnswers[currentQuestion]?.includes(index) ? 'checked' : ''}
          >
          ${answer.text}
        </label>
      </div>
    `).join('')}
  </div>
`;

questionDiv.innerHTML = questionHTML;
quizForm.appendChild(questionDiv);
}

// Update Navigation Buttons (unchanged)
function updateButtons() {
prevBtn.disabled = currentQuestion === 0;
nextBtn.disabled = false;
  submitBtn.disabled = currentQuestion !== quizData.length - 1;

  if (currentQuestion === quizData.length - 1) {
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'block';
} else {
  nextBtn.style.display = 'block';
  submitBtn.style.display = 'none';
}
}

// Update Progress Bar (unchanged)
function updateProgress() {
const progress = ((currentQuestion + 1) / quizData.length) * 100;
progressBar.style.width = `${progress}%`;
}

// Save User Answer (unchanged)
function saveAnswer() {
const selected = [];
document.querySelectorAll(`input[name="answer"]:checked`).forEach(input => {
  selected.push(parseInt(input.value));
});
userAnswers[currentQuestion] = selected;
}

// Simplified Calculate Score
function calculateScore() {
let score = 0;
quizData.forEach((question, index) => {
  const userAnswer = userAnswers[index];
  if (userAnswer && userAnswer.length === 1) {
    if (question.answers[userAnswer[0]].correct) {
      score++;
    }
  }
});
return score;
}

// Show Results
function showResults() {
const score = calculateScore();
finalScoreDisplay.textContent = score;
  totalQuestionsFinal.textContent = quizData.length;

let feedbackHTML = '';
quizData.forEach((question, index) => {
  const userAnswer = userAnswers[index] || [];
  const correctIndex = question.answers.findIndex(answer => answer.correct);
  
  feedbackHTML += `
    <div class="${userAnswer[0] === correctIndex ? 'correct-answer' : 'wrong-answer'}">
      <strong>Q${index + 1}:</strong> ${question.question}<br>
      Your answer: ${userAnswer.length ? question.answers[userAnswer[0]].text : 'None'}<br>
      Correct answer: ${question.answers[correctIndex].text}
    </div>
    <hr>
  `;
});

answerFeedback.innerHTML = feedbackHTML;
const motivationalMessage = document.getElementById('motivational-message');
const percentage = (score / quizData.length) * 100;

if (percentage === 100) {
  motivationalMessage.textContent = "Perfect score! You're a quiz master! 🏆";
} else if (percentage >= 80) {
  motivationalMessage.textContent = "Great job! You really know your stuff! 💪";
} else if (percentage >= 50) {
  motivationalMessage.textContent = "Nice effort! A little more practice and you’ll ace it! 😊";
} else {
  motivationalMessage.textContent = "Keep going! Mistakes are just stepping stones to success! 🌱";
}
resultsModal.show();
}

// Event Listeners (unchanged)
prevBtn.addEventListener('click', () => {
saveAnswer();
currentQuestion--;
renderQuestion();
updateButtons();
updateProgress();
});

nextBtn.addEventListener('click', () => {
  saveAnswer();
  currentQuestion++;
  const halfwayIndex = Math.floor(quizData.length / 2);
  if (currentQuestion === halfwayIndex) {
    const halfwayModal = new bootstrap.Modal(document.getElementById('halfway-modal'));
    halfwayModal.show();
  }
  renderQuestion();
  updateButtons();
  updateProgress();
});

submitBtn.addEventListener('click', (e) => {
e.preventDefault();
saveAnswer();
showResults();
});

// Initialize
initQuiz();