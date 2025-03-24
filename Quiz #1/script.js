// Quiz Data
const quizData = [
    {
      question: "1. What is one major mental health concern associated with excessive video game use in teens?",
      type: "single",
      answers: [
        { text: "Increased Focus", correct: false },
        { text: "Addiction", correct: true },
        { text: "Improved Sleep", correct: false },
        { text: "Worsened Academic Performance", correct: false }
      ]
    },
    {
      question: "2. How can excessive gaming negatively affect academic performance?",
      type: "single",
      answers: [
        { text: "It can increase motivation for schoolwork", correct: false },
        { text: "It can interfere with sleep and focus", correct: true },
        { text: "It helps improve cognitive skills for studying", correct: false },
        { text: "It makes homework easier", correct: false }
      ]
    },
    {
      question: "3. Which of the following is a potential social consequence of excessive video game use?",
      type: "single",
      answers: [
        { text: "a) Increased social interactions with peers", correct: false },
        { text: "b) Enhanced communication skills", correct: false },
        { text: "c) Social isolation and poor communication skills", correct: true },
        { text: "d) Better relationships with family", correct: false },
      ]
    },
    {
     question: "4. What effect can violent video games have on teens?",
        type: "single",
        answers: [
          { text: "a) They may improve their conflict resolution skills", correct: false },
          { text: "b) They may lead to desensitization to aggression and increase violent behavior", correct: true },
          { text: "c) They have no impact on behavior", correct: false },
          { text: "d) They reduce aggression and promote peace", correct: false }
        ]   
    },
    {
    question: "5. How does excessive gaming affect physical health?",
        type: "single",
        answers: [
          { text: "a) It improves posture and vision", correct: false },
          { text: "b) It promotes physical fitness", correct: false },
          { text: "c) It can lead to poor posture, eye strain, and weight gain", correct: true },
          { text: "d) It increases physical endurance", correct: false }
        ]
    },
    {
    question: "6. What is one way parents can help teens develop healthier gaming habits?",
        type: "single",
        answers: [
          { text: "a) Encourage unlimited gaming time", correct: false },
          { text: "b) Monitor the content of games and set time limits", correct: true },
          { text: "c) Discourage any form of social interaction", correct: false },
          { text: "d) Allow unrestricted access to all games", correct: false }
        ]
    },
    {
    question: "7. What is a key benefit of establishing a balanced approach to gaming?",
        type: "single",
        answers: [
          { text: "a) It can increase gaming skills", correct: false },
          { text: "b) It helps teens maintain their mental and physical well-being", correct: true },
          { text: "c) It improves gaming performance", correct: false },
          { text: "d) It eliminates all health risks related to gaming", correct: false }
        ]
    },
    {
    question: "8. Which of the following is a potential cognitive benefit of playing video games in moderation?",
        type: "single",
        answers: [
          { text: "a) Better grades in school", correct: false },
          { text: "b) Improved cognitive skills and hand-eye coordination", correct: true },
          { text: "c) Reduced stress", correct: false },
          { text: "d) Increased emotional intelligence", correct: false }
        ]
    }
  ];
  
  // DOM Elements
  const quizForm = document.getElementById('quiz-form');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const progressBar = document.querySelector('.progress-bar');
  const scoreDisplay = document.querySelector('.score-display span:first-child');
  const totalQuestionsDisplay = document.querySelector('.score-display span:last-child');
  const resultsModal = new bootstrap.Modal(document.getElementById('results-modal'));
  const finalScoreDisplay = document.getElementById('final-score');
  const totalQuestionsFinal = document.getElementById('total-questions');
  const answerFeedback = document.getElementById('answer-feedback');
  
  // Quiz State
  let currentQuestion = 0;
  let score = 0;
  const userAnswers = [];
  
  // Initialize Quiz
  function initQuiz() {
    totalQuestionsDisplay.textContent = quizData.length;
    totalQuestionsFinal.textContent = quizData.length;
    renderQuestion();
    updateButtons();
    updateProgress();
  }
  
  // Render Current Question
  function renderQuestion() {
    quizForm.innerHTML = '';
    const question = quizData[currentQuestion];
    
    const questionDiv = document.createElement('div');
    questionDiv.className = `question ${currentQuestion === 0 ? 'active' : ''}`;
    
    const questionHTML = `
      <h2>${currentQuestion + 1}. ${question.question}</h2>
      <div class="answers">
        ${question.answers.map((answer, index) => `
          <div class="answer-option">
            <label>
              <input 
                type="${question.type === 'single' ? 'radio' : 'checkbox'}" 
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
  
  // Update Navigation Buttons
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
  
  // Update Progress Bar
  function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  // Save User Answer
  function saveAnswer() {
    const question = quizData[currentQuestion];
    const selected = [];
    
    document.querySelectorAll(`input[name="answer"]:checked`).forEach(input => {
      selected.push(parseInt(input.value));
    });
    
    userAnswers[currentQuestion] = selected;
  }
  
  // Calculate Score
  function calculateScore() {
    score = 0;
    quizData.forEach((question, index) => {
      const userAnswer = userAnswers[index] || [];
      const correctAnswers = question.answers
        .map((answer, i) => answer.correct ? i : null)
        .filter(i => i !== null);
      
      if (question.type === 'single') {
        if (userAnswer.length === 1 && correctAnswers.includes(userAnswer[0])) {
          score++;
        }
      } else {
        // For multiple choice, all correct answers must be selected with no incorrect ones
        const allCorrect = userAnswer.length === correctAnswers.length && 
          userAnswer.every(ans => correctAnswers.includes(ans));
        if (allCorrect) score++;
      }
    });
    
    scoreDisplay.textContent = score;
  }
  
  // Show Results
  function showResults() {
    finalScoreDisplay.textContent = score;
    
    let feedbackHTML = '';
    quizData.forEach((question, index) => {
      const userAnswer = userAnswers[index] || [];
      const correctAnswers = question.answers
        .map((answer, i) => answer.correct ? i : null)
        .filter(i => i !== null);
      
      const isCorrect = question.type === 'single' 
        ? userAnswer.length === 1 && correctAnswers.includes(userAnswer[0])
        : userAnswer.length === correctAnswers.length && 
          userAnswer.every(ans => correctAnswers.includes(ans));
      
      feedbackHTML += `
        <div class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
          <strong>Q${index + 1}:</strong> ${question.question}<br>
          Your answer: ${userAnswer.length ? userAnswer.map(a => question.answers[a].text).join(', ') : 'None'}<br>
          Correct answer: ${correctAnswers.map(a => question.answers[a].text).join(', ')}
        </div>
        <hr>
      `;
    });
    
    answerFeedback.innerHTML = feedbackHTML;
    resultsModal.show();
  }
  
  // Event Listeners
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
    calculateScore();
    showResults();
  });
  
  // Initialize
  initQuiz();