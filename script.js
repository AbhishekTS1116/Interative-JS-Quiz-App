
const questions = [
    {
        question: "Which keyword is used to declare a variable that can be reassigned in JavaScript?",
        options: ["const", "let", "varies", "define"],
        answer: "let"
    },
    {
        question: "What data type is the value true or false in JavaScript?",
        options: ["String", "Number", "Boolean", "Object"],
        answer: "Boolean"
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Which DOM method is used to select an element by its ID?",
        options: ["document.selectId()", "document.getElementById()", "document.findId()", "document.queryId()"],
        answer: "document.getElementById()"
    },
    {
        question: "Which event occurs when a user clicks on an HTML button?",
        options: ["onhover", "click", "submit", "change"],
        answer: "click"
    },
    {
        question: "What is the index of the first element in a JavaScript array?",
        options: ["0", "1", "-1", "first"],
        answer: "0"
    },
    {
        question: "Which operator is used to check both value and type equality?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question: "Which method is used to create a new HTML element dynamically in JavaScript?",
        options: ["document.createElement()", "document.newElement()", "document.makeElement()", "document.appendElement()"],
        answer: "document.createElement()"
    }
];


let currentQuestionIndex = 0;
let score = 0;


const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz-section");
const scoreSection = document.getElementById("score-section");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    nextButton.classList.add("hidden");

    optionsContainer.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach(function (option) {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");

        button.addEventListener("click", selectAnswer);

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const selectedAnswer = selectedButton.innerText;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");

        const buttons = optionsContainer.children;
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === correctAnswer) {
                buttons[i].classList.add("correct");
            }
        }
    }

    const buttons = optionsContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    nextButton.classList.remove("hidden");
}

function showScore() {
    quizSection.classList.add("hidden");
    scoreSection.classList.remove("hidden");

    let feedback = "";
    if (score === 8) {
        feedback = "Excellent work! Perfect score!";
    } else if (score >= 5) {
        feedback = "Good job! You have a solid understanding!";
    } else {
        feedback = "Keep practicing! Review the concepts and try again.";
    }

    scoreText.innerText = `You scored ${score} out of ${questions.length} — ${feedback}`;
}

nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;
    scoreSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    loadQuestion();
});

loadQuestion();
