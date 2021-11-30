//Declares variables and pulls HTML values into JS.
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
var highScore = document.querySelector(".highScore");
var totalScore = document.querySelector(".totalScore");
var tryAgain = document.querySelector(".tryAgain");
var textBox = document.querySelector("#textBox");
var yourInitialsInput = document.getElementById("#initials");
var submit = document.querySelector(".submit");
var secondsLeft = 60;
var index = 0;
var questions = [];
var count = 0;
totalScore = 0;
highScore = 0;

//questions[0].choices[2]
//array of questions. index we call on for current and next question. array, object in array(question object-choices[array]-answer object)
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
//default value of startcard is display:none. This shows the card at the beginning and I can remove it after startGame function is called.
startCard.style.display="block";

questionEl.style.backgroundColor = "red";
//choices.style.backgroundColor = "green";
questionCard.style.backgroundColor="orange";
nextQuestion.style.backgroundColor = "purple";
timeEl.style.backgroundColor = "yellow";

//startGame function defined. Hide the start button, display 'first' question, start timer.
function startGame() {
    
    startCard.style.display = "none";
    questionCard.style.display = "block";
    resultsCard.style.display = "none";
    //displays question and choices
    callQuestion();
    //starts the timer
    setTime();
    //determines question number
    navigate(0);

}

//Start the timer when user clicks start. Want this to be a global function.
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        //inserts timer element, starting at 120 seconds
        //Advises the user how many seconds are left.
        timeEl.innerHTML = secondsLeft + " seconds left til the quiz ends.";

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and send the results message
            results();
        }
//Timer countsdown every 1 second
    }, 1000);
  
}

//This function is called from startGame() or nextQuestion eventListener.
function callQuestion(){
    
    //if my current index point is greater than the length of my question array then I start the results();
    if(index >= questions.length){
        console.log("Hello Wolrd");
        results();
    }
    //if my current index(retrieved from navigate())is lower than the length of my question array I continue on with the game. 
    else{
        //reset the text of the question and choice elements.
        questionEl.innerHTML="";
        choicesEl.innerHTML="";
        //reset my count at 1 so it isn't being added twice.
        //count=0;
        
        questionEl.innerHTML=questions[index].question;

        choicesEl.forEach(function(element,i){
            element.textContent=questions[index].choices[i];
//forEach loop allows me to display the two items (element, and index (i) that I want to work with and be able to evaluate)
        }
        );
    }

}
function checkAnswer(i){
    console.log(i);
    console.log(questions[index].correctAnswer)
    if (questions[index].correctAnswer === i){
        //increase my count by 1 for the locally stored variable count.
        count++;
        localStorage.setItem("count",count);
        console.log(count);//check for errors

    }
    else{
        //change nothing in my count var.
        console.log("Wrong Answer");

    }
}
    
//Determines where we are in the index, dependent on when we call navigate with a 0 or 1.
function navigate(direction) {
    index = index + direction;
  
    console.log(index);
    console.log(questions[index]);
}
//Navigates +1 in the index and returns to the call question function.
nextQuestion.addEventListener("click", function () {
    navigate(1);
    callQuestion();
}
)

//Displays how many you got right. Will (eventually) allow you to enter initials with score and save to local storage.
function results() {
    resultsCard.style.display = "block";
    startCard.style.display = "none";
    questionCard.style.display = "none";
  

  //Gets the total score from the incremented count value found in CallQuestion function
  
  //Displays the total score - NEED TO FIX.
  resultsCard.innerHTML=
  textBox.innerHTML = `Enter your initials Here!`;
  resultsCard.appendChild("textBox");

  
} 
localStorage.setItem("highScore", highScore);  
totalScore =localStorage.getItem("count", count);
totalScore =parseInt(totalScore);

textBox.addEventListener("input",function(){});

localStorage.setItem(JSON.stringify("input", initials));
submit.addEventListener("click", function(){
    textBox.value = localStorage.getItem(JSON.parse("initials"));
});
}


//}

//calls the start game function when Start is clicked.
startButton.addEventListener("click", function() {
    startGame();
}
)