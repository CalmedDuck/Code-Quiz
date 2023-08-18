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

      function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
          const answer = selectedOption.value;
          if (answer === quizData[currentQuestion].answer) {
            score++;
          } else {
            incorrectAnswers.push({
              question: quizData[currentQuestion].question,
              incorrectAnswer: answer,
              correctAnswer: quizData[currentQuestion].answer,
            });
            timeLeft -= 10; // Subtract 10 seconds for incorrect answer
          }
          currentQuestion++;
          selectedOption.checked = false;
          if (currentQuestion < quizData.length) {
            displayQuestion();
          } else {
            displayResult();
          }
        }
      }
      function displayResult() {
        clearInterval(countdown);
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        
        const initialsInput = document.createElement('input');
        initialsInput.type = 'text';
        initialsInput.id = 'initialsInput';
        initialsInput.placeholder = 'Enter your initials';
        
        const highScoresButton = document.createElement('button');
        highScoresButton.className = 'button';
        highScoresButton.textContent = 'High Scores';
        highScoresButton.id = 'highScores';
        highScoresButton.addEventListener('click', displayHighScores);
        
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!<br>Time left: ${timeLeft}`;
        resultContainer.appendChild(initialsInput);
        resultContainer.appendChild(highScoresButton);
      }
      
      function retryQuiz() {
        clearInterval(countdown);
        currentQuestion = 0;
        score = 0;
        timeLeft = 60; // Reset the timer
        incorrectAnswers = [];
        quizContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
        retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        
        const initialsInput = document.getElementById('initialsInput');
        if (initialsInput) {
          initialsInput.value = ''; // Reset initials input
        }
        
        resultContainer.innerHTML = '';
        displayQuestion();
      }
      