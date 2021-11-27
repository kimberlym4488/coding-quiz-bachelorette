var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector(".questions");
var question = document.querySelector(".question");
var correctAnswer = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var results = document.querySelector("#results");
var timeEl = document.createElement("timerElement");
var quizMainSection = document.querySelector("#quizMainSection");
var secondsLeft = 120;
var startCard = document.querySelector(".startCard");
var questionCard = document.querySelector(".questionCard");
var index = 0;



//inserts timer element, starting at 120 seconds
nextQuestion.setAttribute("style", "border:solid 5px black")
timeEl.setAttribute("style", "border:solid 5px black;")

function changeColor() {
    startButton.style.backgroundColor = "red";
    return false;
}
//event listener created for container - click to start game.
//startGame function defined. Hide the start button and display 1st question
function startGame() {

    startCard.style.display = "none";
    questionCard.style.display = "block";
    setTime();
    callQuestion();
    navigate(0);
    
}
function callQuestion(){
    //create if statement to break out of the recursion. If index < questions.length ....else (index>questions.length return results();
    questionCard.innerHTML="";
    question.innerHTML=questions[index].question;
    //create buttons to go with corresponding choices. If the user selects the index choice that matches correctAnswer display Correct. If the user selects the index choice that doesn't match correctAnswer display incorrect. Then they click nextQuestion.
    for(var i=0; i<4; i++) {
        var button = document.createElement("button");
        //for each button it's text content should be the corresponding array item from question[];
        button.textContent = questions[index].choices[i];
        questionCard.appendChild(button);
        button.onclick=callQuestion;
    }
}

function navigate(direction) {
    index = index + direction;
    console.log(index);
    if (index === questions.length - 1) {
        console.log(index);
        results();
    }
    else {
        index++;
    }
    currentQuestion = questions[index];
    console.log(currentQuestion);
}


nextQuestion.addEventListener("click", function (event) {
    event.stopPropagation();
    navigate(1);
}
)

//Start the timer when user clicks start. Want this to be a global functio.
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.innerHTML = secondsLeft + " til the quiz ends.";


        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and send the results message
            results();
        }

    }, 1000);
    questionCard.appendChild(timeEl);
}

//Displays
function results() {

    var yourScore = document.createElement("yourScore");
    yourScore.innerHTML = ($`You got ${rightAnswers} right! Please enter your initials here to save your scores.`);
    container.appendChild("yourScore");

}
//questions[0].choices[2]
//array of questions. inde
questions = [
    {
        question: "What is the occupation of Michelle Young as of 2021?",
        choices: ["Social Media Influencer",
            "Educator",
            "Basketball Coach",
            "Dental Hygienist"],
        correctAnswer: "Educator"
    },

    {
        question: "Who received the first Impression Rose on night 1?",
        choices: ["Rick",
         "Joe",
         "Nayte",
         "Brandon"],
        correctAnswer: "Nayte"
    },

    {
        question: "Who or what did contestant Ryan F bring to his hotel room that got him kicked off on night 1?",
        choices: ["Study notes",
        "Pictures of ex-girlfriend",
        "A producer on the show",
        "Illegal substance"],
        correctAnswer: "Study notes"
    },
]

startButton.addEventListener("click", function () {
    startGame();
}
)