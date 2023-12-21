document.getElementById('start-btn').addEventListener('click', startGame);
let currentQuestionIndex, questionsShuffled, timer;
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const endScreenElement = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');

function startGame() {
    document.getElementById('start-btn').classList.add('hide');
    questionsShuffled = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    timer = 60; // Set timer (in seconds)
    startTimer();
    setNextQuestion();
}

function startTimer() {
    const timerId = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questionsShuffled[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        timer -= 10; // Subtract time for wrong answers
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionContainerElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    finalScoreElement.textContent = timer;
    document.getElementById('save-score-btn').addEventListener('click', () => {
        const initials = document.getElementById('initials').value;
        const score = {
            initials: initials,
            score: timer
        };
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.href = 'scores.html'; 
    });
}


function saveScore() {
    const initials = document.getElementById('initials').value;
    const score = {
        initials: initials,
        score: timer
    };
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

const questions = [
    {
        question: 'Inside which HTML element do we put JavaScript?',
        answers: [
            { text: '<scripting>', correct: false },
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false }
        ]
    },
    {
        question: 'What is the correct place to insert a JavaScript?',
        answers: [
            { text: 'The <body> section', correct: false },
            { text: 'Both the <head> section and the <body> section are correct', correct: true },
            { text: 'The <head> section', correct: false },
            { text: 'Neptune', correct: false }
        ]
    },
    {
        question: 'How do you call a function named myFunction?',
        answers: [
            { text: 'myFunction()', correct: true },
            { text: 'call function myFunction()', correct: false },
            { text: 'call myFunction()', correct: false },
            { text: 'Argentina', correct: false }
        ]
    },
    {
        question: 'How does a WHILE loop start?',
        answers: [
            { text: 'while (i <= 10)', correct: true },
            { text: 'while i = 1 to 10', correct: false },
            { text: 'while (i <= 10, i++)', correct: false },
            { text: 'Idk', correct: false }
        ]
    },
    {
        question: 'Which of the following is used to parse a string to an int in JavaScript?',
        answers: [
            { text: 'Integer.parse()', correct: false },
            { text: 'parseInt()', correct: true },
            { text: 'parse.Int()', correct: false },
            { text: 'toInt()', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Trainer Marking Language', correct: false },
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Texts Markup Language', correct: false },
            { text: 'Hyper Text Markup Leveler', correct: false }
        ]
    },
    {
        question: 'Which symbol is used for comments in JavaScript?',
        answers: [
            { text: '//', correct: true },
            { text: '/* */', correct: false },
            { text: '<!-- -->', correct: false },
            { text: '#', correct: false }
        ]
    },
    {
        question: 'Which of the following is a JavaScript framework?',
        answers: [
            { text: 'React', correct: true },
            { text: 'Laravel', correct: false },
            { text: 'Django', correct: false },
            { text: 'Ruby on Rails', correct: false }
        ]
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        answers: [
            { text: 'font', correct: false },
            { text: 'style', correct: true },
            { text: 'styles', correct: false },
            { text: 'class', correct: false }
        ]
    },
    {
        question: 'In CSS, what does "h1 {color: red;}" change?',
        answers: [
            { text: 'The background color of all <h1> elements', correct: false },
            { text: 'The text color of all <h1> elements', correct: true },
            { text: 'The size of all <h1> elements', correct: false },
            { text: 'The alignment of all <h1> elements', correct: false }
        ]
    },
    {
        question: 'What does "var" stand for in JavaScript?',
        answers: [
            { text: 'Variant', correct: false },
            { text: 'Variable', correct: true },
            { text: 'Variance', correct: false },
            { text: 'Variety', correct: false }
        ]
    }

];
