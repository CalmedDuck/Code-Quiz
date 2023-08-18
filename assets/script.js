const quizData = [
    {
      question: 'Inside which HTML element do we put JavaScript?',
      options: ['<scripting>', '<script>', '<javascript>', '<js>'],
      answer: '<scripting>',
    },
    {
      question: 'What is the correct place to insert a JavaScript?',
      options: ['The <body> section', 'Both the <head> section and the <body> section are correct', 'The <head> section', 'Neptune'],
      answer: 'Both the <head> section and the <body> section are correct',
    },
    {
      question: 'How do you call a function named myFunction?',
      options: ['myFunction()', 'call function myFunction()', 'call myFunction()', 'Argentina'],
      answer: 'myFunction()',
    },
    {
      question: 'How does a WHILE loop start?',
      options: ['while (i <= 10)', 'while i = 1 to 10', 'while (i <= 10, i++', 'Idk'],
      answer: 'while (i <= 10)',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      answer: 'Pacific Ocean',
    },

    ];

    const startButton = document.getElementById('start');
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');
    let countdown;
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 60;
    let incorrectAnswers = [];
    
    function startQuiz() {
      startButton.style.display = 'none';
    
      countdown = setInterval(function() {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(countdown);
          timeLeft = 0;
          displayResult();
        } else {
          document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;
        }
      }, 1000);
    
      displayQuestion();
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
      function displayQuestion() {
        const questionData = quizData[currentQuestion];
      
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = questionData.question;
      
        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';
      
        for (let i = 0; i < questionData.options.length; i++) {
          const option = document.createElement('label');
          option.className = 'option';
      
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'quiz';
          radio.value = questionData.options[i];
      
          const optionText = document.createTextNode(questionData.options[i]);
      
          option.appendChild(radio);
          option.appendChild(optionText);
          optionsElement.appendChild(option);
        }
      
        const submitButton = document.createElement('button');
        submitButton.className = 'button';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', checkAnswer);
      
        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
        quizContainer.appendChild(submitButton);
      }