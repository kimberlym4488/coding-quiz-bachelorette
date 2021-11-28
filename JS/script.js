var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector(".questions");
var question = document.querySelector(".question");
var choices = document.createElement("choices")
var correctAnswer = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var timeEl = document.querySelector(".timerElement");
var quizMainSection = document.querySelector("#quizMainSection");
var startCard = document.querySelector(".startCard");
var questionCard = document.querySelector(".questionCard");
var resultsCard = document.querySelector("#resultsCard");
var secondsLeft = 120;
var index = 0;
var currentQuestion = questions[index];



//inserts timer element, starting at 120 seconds

question.style.backgroundColor = "red";
//choices.style.backgroundColor = "green";
questionCard.style.backgroundColor="orange";
nextQuestion.style.backgroundColor = "purple";
timeEl.style.backgroundColor = "yellow";


//event listener created for container - click to start game.
//startGame function defined. Hide the start button and display 1st question
function startGame() {
    
    startCard.style.display = "none";
    questionCard.style.display = "block";
    resultsCard.style.display = "none";
    callQuestion();
    setTime();
    navigate(0);

}
//Start the timer when user clicks start. Want this to be a global functio.
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.innerHTML = secondsLeft + " seconds left til the quiz ends.";


        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and send the results message
            results();
        }

    }, 1000);
  
}
function callQuestion(){
    //create if statement to break out of the recursion. If index < questions.length ....else (index>questions.length return results();
    question.innerHTML="";
    question.innerHTML=questions[index].question;
    //button.innerHTML = currentQuestion.choices[i];
    //create buttons to go with corresponding choices. If the user selects the index choice that matches correctAnswer display Correct. If the user selects the index choice that doesn't match correctAnswer display incorrect. Then they click nextQuestion.
    for(var i=0; i < questions[index].choices.length; i++) {
        //for each button it's text content should be the corresponding array item from question[];
        var button = document.createElement("button");
        button.innerHTML=questions[index].choices[i];
        question.appendChild(button);
        button.style.color = "white";
        button.style.backgroundColor = "black";
        button.style.display = "block";
        button.addEventListener("click", function(){
            console.log(button.textContent);
        })
        //this works but it won't call the correct answer when I do
        //button.onclick=currentquestion.correctAnswer
    }
}


function navigate(direction) {
    index = index + direction;
    
    if (index === questions.length - 1) {
        console.log(index);
        results();
    }
    else {
        index++;
        console.log(index);
    }
}


nextQuestion.addEventListener("click", function () {
   callQuestion();
}
)

//Displays if you got it right or wrong.
function results() {
    startCard.style.display = "none";
    questionCard.style.display = "none";
    resultsCard.style.display = "block";
    var yourScore = document.createElement("yourScore");
    yourScore.textContent = ($`You got this many right`);
    resultsCard.appendChild("yourScore");
}
//questions[0].choices[2]
//array of questions. index
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

startButton.addEventListener("click", function() {
    startGame();
}
)