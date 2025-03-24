// Quiz Data
const quizData = [
    {
      question: "What does CBT stand for?",
      type: "single",
      answers: [
        { text: "Cognitive-Based Thinking", correct: false },
        { text: "Creative Behavioral Therapy", correct: false },
        { text: "Cognitive-Behavioral Therapy", correct: true },
        { text: "Cognitive-Balancing Technique", correct: false }
      ]
    },
    {
      question: "Which of these are programming languages? (Select all that apply)",
      type: "multiple",
      answers: [
        { text: "JavaScript", correct: true },
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "Python", correct: true }
      ]
    },
    {
      question: "True or False: Excessive gaming has no effect on brain function.",
      type: "single",
      answers: [
        { text: "True", correct: false },
        { text: "False", correct: true }
      ]
    },
    {
     question: "Which part of the brain is most affected by prolonged gaming?",
        type: "single",
        answers: [
          { text: "Gray Matter", correct: false },
          { text: "Brainstem", correct: false },
          { text: "Cerebellum", correct: false },
          { text: "Corpus callosum", correct: true }
        ]   
    },
    {
    question: "What is one strategy used in CBT to reduce gaming addiction?",
        type: "single",
        answers: [
          { text: "Avoiding the triggers", correct: true },
          { text: "Playing more games", correct: false },
          { text: "Playing with friends", correct: false },
          { text: "Playing games with a higher difficulty", correct: false }
        ]
    },
    {
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