// Quiz Data
const quizData = [
  {
    question: "Example Question",
    type: "single",
    answers: [
      { text: "Example Answer", correct: false },
      { text: "Example Answer", correct: true },
      { text: "Example Answer", correct: false },
      { text: "Example Answer", correct: false }
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