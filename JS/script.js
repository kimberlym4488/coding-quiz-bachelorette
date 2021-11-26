var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector(".questions");
var correctAnswer = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var results = document.querySelector("#results");
var timeEl = document.querySelector(".timerElement");
var quizMainSection = document.querySelector("#quizMainSection");
var index=0;
navigate(0);

//inserts timer element, starting at 120 seconds
timeEl.innerHTML="120";
timeEl.style.css("border:solid 5px black;")
quizMainSection.appendChild(timeEl);

//event listener created for container - click to start game.
container.addEventListener("click", function(){
    startGame();
}
)
//startGame function defined. Hide the start button and display 1st question
function startGame(){
    startButton.setAttribute("display","hidden");
    quizMainSection.appendChild(navigate(index[0]));
    setTime();
}

function navigate(direction) {
    index=index+direction;
        if(index=questions.length-1) {
            results();
        }
        else {
            index++;
        }

        currentQuestion=questions[index];
}


nextQuestion.addEventListener("click", function(event) {
    event.stopPropagation();
    navigate(1);
}
)

//Start the timer when user clicks start.
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " til the quiz ends.";
        
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and send the results message
        results();
      }
   
    }, 1000);
}



function results(){

    var yourScore = document.createElement("yourScore");
    yourScore.innerHTML=($`You got ${rightAnswers} right! Please enter your initials here to save your scores.`);
    container.appendChild("yourScore");

}


questions = [
    {  question: "What is the occupation of Michelle Young as of 2021?",
        answer1: "Social Media Influencer",
        answer2: "Educator",
        answer3: "Basketball Coach",
        answer4: "Dental Hygienist",
        correctAnswer: "Educator"},

    { question: "Who received the first Impression Rose on night 1?",
        answer1: "Rick",
        answer2: "Joe",
        answer3: "Nayte",
        answer4: "Brandon",
        correctAnswer: "Nayte"},
    
    { question: "Who or what did contestant Ryan F bring to his hotel room that got him kicked off on night 1?",
        answer1: "Study notes",
        answer2: "Pictures of ex-girlfriend",
        answer3: "A producer on the show",
        answer4: "Illegal substance",
        correctAnswer: "Study notes"},

]