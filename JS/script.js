var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector(".questions");
var question = document.querySelector(".question");
var buttonChoices = document.querySelector(".buttonChoices"); 
var choices = document.querySelectorAll(".choices");
var correctAnswer = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var timeEl = document.querySelector(".timerElement");
var quizMainSection = document.querySelector("#quizMainSection");
var startCard = document.querySelector(".startCard");
var questionCard = document.querySelector(".questionCard");
var resultsCard = document.querySelector("#resultsCard");
var secondsLeft = 120;
var index = 0;
var output = [];




//questions[0].choices[2]
//array of questions. index
questions = [
    {
        question: "What is the occupation of Michelle Young as of 2021?",
        choices: [
            "Social Media Influencer",
            "Educator",
            "Basketball Coach",
            "Dental Hygienist"],
        correctAnswer: 1
    },

    {
        question: "Who received the first Impression Rose on night 1?",
        choices: [
        "Rick",
         "Joe",
         "Nayte",
         "Brandon"],
        correctAnswer: 2
    },

    {
        question: "Who or what did contestant Ryan F bring to his hotel room that got him kicked off on night 1?",
        choices: [
        "Study notes",
        "Pictures of ex-girlfriend",
        "A producer on the show",
        "Illegal substance"],
        correctAnswer: 0
    },

    {
        question: "Who ghosted Michelle before the season started?",
        choices: [
        "Joe",
        "Tayshia",
        "Her dad",
        "Rick"],
        correctAnswer: 0
    },
]

var currentQuestion = questions[index];
var yourAnswer = document.createElement("yourAnswer");


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
        //inserts timer element, starting at 120 seconds
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
    choices.innerHTML="";
    question.innerHTML=questions[index].question;

    //button.innerHTML = currentQuestion.choices[i];
    //create buttons to go with corresponding choices. If the user selects the index choice that matches correctAnswer display Correct. If the user selects the index choice that doesn't match correctAnswer display incorrect. Then they click nextQuestion.
        //for each button it's text content should be the corresponding array item from question[];

       choices.forEach(function(element,index){
            element.textContent=currentQuestion.choices[index];
            element.addEventListener("click", function(){
                if (currentQuestion.correctAnswer == index){
                    console.log("Correct Answer");
                    console.log(element,index);

                }   else{
                    console.log("Wrong Answer");
                }
                }
            )
        }
        );
        //choices.innerHTML=questions[index].choices[index];
            console.log(currentQuestion.choices);
            console.log(choices.textContent);
            console.log(currentQuestion);
            console.log(currentQuestion.choices);
            console.log(currentQuestion.correctAnswer)
           
        
        
        //this works but it won't call the correct answer when I do
    }

function navigate(direction) {
    index = index + direction;
    console.log(index);
    if (index <= questions.length - 1) {
        index++;
       
    }
    else {
        return;
    }
}


nextQuestion.addEventListener("click", function () {
   callQuestion();
   navigate(1);
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
startButton.addEventListener("click", function() {
    startGame();
}
)