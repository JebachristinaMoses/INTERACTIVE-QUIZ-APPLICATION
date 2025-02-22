let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


const quizArray = [
    {
        id: "0",
        question: "Which of the following is an example of AI?",
        options: ["A calculator", "A Self Driving car", "A Digital camera", "A Microwave oven"],
        correct: "A Self Driving car",
    },
    {
        id: "1",
        question: "What does NLP stand for in the context of AI?",
        options: ["Natural learning processing", "Natural language processing", "Neural learning protocol", "Neural language program"],
        correct: "Natural language processing",
    },
    {
        id: "2",
        question: "which algorithm is used for supervised learning in AI?",
        options: ["K-means clustering", "Decision tree", "Principal component analysis", "Apriori"],
        correct: "Decision tree",
    },
    {
        id: "3",
        question: "Which of the following is a challenge for AI development?",
        options: ["High computational Power", "Ethical conserns", "Data quality", "All of the above"],
        correct: "All of the above",
    },
    {
        id: "4",
        question: "Which programming language is commonly used for AI development?",
        options: ["Python", "CSS", "HTML", "SQL"],
        correct: "Python",
    },
    
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        
        questionCount += 1;
        
        if (questionCount == quizArray.length) {
            
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
           
        }
    })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};


const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
   
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    
    quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
   
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
       
        i.options.sort(() => Math.random() - 0.5);
        
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
    
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

   
    clearInterval(countdown);
   
    options.forEach((element) => {
        element.disabled = true;
    });
}


function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    quizCreator();
    quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
