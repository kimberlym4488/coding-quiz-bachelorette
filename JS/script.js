var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questionsEl = document.querySelector(".questions");
var questionEl = document.querySelector(".question");
var buttonChoices = document.querySelector(".buttonChoices"); 
var choicesEl = document.querySelectorAll(".choices");
var correctAnswerEl = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var timeEl = document.querySelector(".timerElement");
var startCard = document.querySelector(".startCard");
var questionCard = document.querySelector(".questionCard");
var resultsCard = document.querySelector(".resultsCard");
var secondsLeft = 120;
var index = 0;
var yourScoreEl = document.querySelector("yourScore");
var questions = [];
yourScoreEl = "";
var count = 0;
var totalScore;

//questions[0].choices[2]
//array of questions. index we call on for current and next question
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

startCard.style.display="block";

questionEl.style.backgroundColor = "red";
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
    
    /*console.log(index);
    console.log(questions[index]);
    console.log(questions.length)*/
    if(index>=questions.length){
        console.log("Hello Wolrd");
        results();
    }
    else{

        questionEl.innerHTML="";
        choicesEl.innerHTML="";
        count=0;
        
    //questions is the array, question is an object in the questions array, choices are array within questions array
    //create if statement to break out of the recursion. If index < questions.length ....else (index>questions.length return results();
  
  
    questionEl.innerHTML=questions[index].question;

    //create buttons to go with corresponding choices. If the user selects the index choice that matches correctAnswer display Correct. If the user selects the index choice that doesn't match correctAnswer display incorrect. Then they click nextQuestion.
        //for each question it's text content should be the corresponding array item from choices.

    choicesEl.forEach(function(element,i){
        element.textContent=questions[index].choices[i];
        element.addEventListener("click", function(e){
                e.stopPropogation;
                if (questions[index].correctAnswer == i){
                    count+=1;
                    localStorage.setItem(count,JSON.stringify(count));
                   // console.log(choicesEl[i]);
                } 
                else{
                   console.log("Wrong Answer");
                }
            }
            );
        }
        );
    }
        //choices.innerHTML=questions[index].choices[index];
}

        //the next question is appearing but not when I console log the currentQuestion after choices


function navigate(direction) {
    index = index + direction;
  
    console.log(index);
    console.log(questions[index]);

}

//navigates +1 in the index and returns to the call question function.)
nextQuestion.addEventListener("click", function () {
    navigate(1);
    callQuestion();
}
)

//Displays how many you got right. Will allow you to enter initials with score and save to local storage.
function results() {
    resultsCard.style.display = "block";
    startCard.style.display = "none";
    questionCard.style.display = "none";
    //var seeResultsButton = document.querySelector("#seeResults");**/
  
    totalScore = localStorage.getItem(count,JSON.parse(count));
    console.log(totalScore);
    resultsCard.textContent=`This is where your highscore of ${totalScore} lives`;
    console.log(`This is where the ${totalScore} lives`);
    
}


//calls the start game function when Start is clicked.
startButton.addEventListener("click", function() {
    startGame();
}
)