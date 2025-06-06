// Quiz Data
const quizData = [
  {
    question: "What is one major mental health concern associated with excessive video game use in teens?",
    type: "single",
    answers: [
      { text: "Increased Focus", correct: false },
      { text: "Addiction", correct: true },
      { text: "Improved Sleep", correct: false },
      { text: "Worsened Academic Performance", correct: false }
    ]
  },
  {
    question: "How can excessive gaming negatively affect academic performance?",
    type: "single",
    answers: [
      { text: "It can increase motivation for schoolwork", correct: false },
      { text: "It can interfere with sleep and focus", correct: true },
      { text: "It helps improve cognitive skills for studying", correct: false },
      { text: "It makes homework easier", correct: false }
    ]
  },
  {
    question: "Which of the following is a potential social consequence of excessive video game use?",
    type: "single",
    answers: [
      { text: "a) Increased social interactions with peers", correct: false },
      { text: "b) Enhanced communication skills", correct: false },
      { text: "c) Social isolation and poor communication skills", correct: true },
      { text: "d) Better relationships with family", correct: false },
    ]
  },
  {
   question: "What effect can violent video games have on teens?",
      type: "single",
      answers: [
        { text: "a) They may improve their conflict resolution skills", correct: false },
        { text: "b) They may lead to desensitization to aggression and increase violent behavior", correct: true },
        { text: "c) They have no impact on behavior", correct: false },
        { text: "d) They reduce aggression and promote peace", correct: false }
      ]   
  },
  {
  question: "How does excessive gaming affect physical health?",
      type: "single",
      answers: [
        { text: "a) It improves posture and vision", correct: false },
        { text: "b) It promotes physical fitness", correct: false },
        { text: "c) It can lead to poor posture, eye strain, and weight gain", correct: true },
        { text: "d) It increases physical endurance", correct: false }
      ]
  },
  {
  question: "What is one way parents can help teens develop healthier gaming habits?",
      type: "single",
      answers: [
        { text: "a) Encourage unlimited gaming time", correct: false },
        { text: "b) Monitor the content of games and set time limits", correct: true },
        { text: "c) Discourage any form of social interaction", correct: false },
        { text: "d) Allow unrestricted access to all games", correct: false }
      ]
  },
  {
  question: "What is a key benefit of establishing a balanced approach to gaming?",
      type: "single",
      answers: [
        { text: "a) It can increase gaming skills", correct: false },
        { text: "b) It helps teens maintain their mental and physical well-being", correct: true },
        { text: "c) It improves gaming performance", correct: false },
        { text: "d) It eliminates all health risks related to gaming", correct: false }
      ]
  },
  {
  question: "Which of the following is a potential cognitive benefit of playing video games in moderation?",
      type: "single",
      answers: [
        { text: "a) Better grades in school", correct: false },
        { text: "b) Improved cognitive skills and hand-eye coordination", correct: true },
        { text: "c) Reduced stress", correct: false },
        { text: "d) Increased emotional intelligence", correct: false }
      ]
  }
];

const additionalQuizData = [
  {
    question: "What is the primary focus of Cognitive Behavioral Therapy (CBT)?",
    type: "single",
    answers: [
      { text: "Identifying and changing negative thought patterns and behaviors", correct: true },
      { text: "Medication management", correct: false },
      { text: "Exploring past trauma", correct: false },
      { text: "Relaxation techniques", correct: false }
    ]
  },
  {
    question: "What is one of the most common psychological conditions treated by CBT?",
    type: "single",
    answers: [
      { text: "Anxiety disorders", correct: true },
      { text: "Heart disease", correct: false },
      { text: "Chronic pain", correct: false },
      { text: "Diabetes", correct: false }
    ]
  },
  {
    question: "According to the article, CBT has been shown to be effective in treating which of the following?",
    type: "single",
    answers: [
      { text: "Bulimia", correct: true },
      { text: "Chronic fatigue", correct: false },
      { text: "Insomnia", correct: false },
      { text: "Autism", correct: false }
    ]
  },
  {
    question: "How does CBT help with anger and stress management?",
    type: "single",
    answers: [
      { text: "By offering strategies to regulate emotional responses and foster healthier coping mechanisms", correct: true },
      { text: "By teaching deep breathing exercises only", correct: false },
      { text: "By encouraging the individual to avoid stressful situations", correct: false },
      { text: "By focusing solely on relaxation techniques", correct: false }
    ]
  },
  {
    question: "According to the article, how does CBT compare to other treatments?",
    type: "single",
    answers: [
      { text: "It produces better outcomes in several conditions", correct: true },
      { text: "It has lower response rates", correct: false },
      { text: "It is equally effective in all conditions", correct: false },
      { text: "It is less popular among therapists", correct: false }
    ]
  },
  {
    question: "What is one area that requires further research in CBT?",
    type: "single",
    answers: [
      { text: "The tailoring of CBT to different populations and specific subgroups", correct: true },
      { text: "The impact of CBT on physical health", correct: false },
      { text: "The effectiveness of CBT in treating addiction", correct: false },
      { text: "The cost of CBT compared to other therapies", correct: false }
    ]
  },
  {
    question: "What is one potential benefit of further research into CBT mentioned in the article?",
    type: "single",
    answers: [
      { text: "More personalized treatments for various age groups and conditions", correct: true },
      { text: "Improved relaxation techniques", correct: false },
      { text: "Decreased popularity among therapists", correct: false },
      { text: "The elimination of medication in treatment", correct: false }
    ]
  },
  {
    question: "Which of the following is a key feature of CBT as mentioned in the article?",
    type: "single",
    answers: [
      { text: "It is short-term and goal-oriented", correct: true },
      { text: "It focuses on long-term therapy", correct: false },
      { text: "It requires no therapist involvement", correct: false },
      { text: "It only addresses past experiences", correct: false }
    ]
  }
];

// Combine both quiz data arrays
const combinedQuizData = quizData.concat(additionalQuizData);

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
const question = combinedQuizData[currentQuestion];

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
submitBtn.disabled = currentQuestion !== combinedQuizData.length - 1;

if (currentQuestion === combinedQuizData.length - 1) {
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'block';
} else {
  nextBtn.style.display = 'block';
  submitBtn.style.display = 'none';
}
}

// Update Progress Bar (unchanged)
function updateProgress() {
const progress = ((currentQuestion + 1) / combinedQuizData.length) * 100;
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
combinedQuizData.forEach((question, index) => {
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
totalQuestionsFinal.textContent = combinedQuizData.length;

let feedbackHTML = '';
combinedQuizData.forEach((question, index) => {
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
const percentage = (score / combinedQuizData.length) * 100;

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
  const halfwayIndex = Math.floor(combinedQuizData.length / 2);
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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('start-screen').classList.add('d-none');
    document.querySelector('.quiz-main').classList.remove('d-none');
    document.querySelector('.quiz-footer').classList.remove('d-none');
  });
});

document.getElementById('next-btn').addEventListener('click', function () {
  const currentQuestion = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (!currentQuestion) {
    alert('Please select an answer before moving on!');
    return; // Stop the function if no answer
  }
  
  // Your existing code to move to the next question
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});