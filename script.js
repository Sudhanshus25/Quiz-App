const questions = [
    {
        question: "What is the name of the weak zone of the earth's crust?",
        answers: [
            {text: "Seismic", correct: true},
            {text: "Cosmic", correct: false},
            {text: "Formic", correct: false},
            {text: "Anaemic", correct: false}
        ]
    },
    {
        question: "Where was India's first national museum opened?",
        answers: [
            {text: "Delhi", correct: false},
            {text: "Hyderabad", correct: false},
            {text: "Rajasthan", correct: false},
            {text: "Mumbai", correct: true}
        ]
    },
    {
        question: "The world's nation 5G mobile network was launched by which country?",
        answers: [
            {text: "Japan", correct: false},
            {text: "America", correct: false},
            {text: "South Korea", correct: true},
            {text: "Malaysia", correct: false}
        ]
    },
    {
        question: "The green planet in the solar system is",
        answers: [
            {text: "Mars", correct: false},
            {text: "Uranus", correct: true},
            {text: "Venus", correct: false},
            {text: "Earth", correct: false}
        ]
    },
    {
        question: "Which of these is the small-scale industry in India?",
        answers: [
            {text: "Jute industry", correct: false},
            {text: "Paper industry", correct: false},
            {text: "Textile industry", correct: false},
            {text: "Handloom industry", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-btn");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
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

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
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
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
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
