//Declares variables and pulls HTML values into JS.
var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questionsEl = document.querySelector(".questions");
var questionEl = document.querySelector(".question");
var incorrectAnswer = document.querySelector(".incorrectAnswer");
var buttonChoices = document.querySelector(".buttonChoices"); 
var choicesEl = document.querySelectorAll(".choices");
var correctAnswerEl = document.querySelector(".correctAnswer");
var nextQuestion = document.querySelector("#nextQuestion");
var timeEl = document.querySelector(".timerElement");
var startCard = document.querySelector(".startCard");
var questionCard = document.querySelector(".questionCard");
var resultsCard = document.querySelector(".resultsCard");
var startAgain = document.querySelector("#startAgain");
var timerInterval;
var banner = document.querySelector(".banner");
var scores = document.querySelector("#scores");
var score = document.querySelector(".score");
var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#initials-form");
var initialsList= document.querySelector("#initials-list");
var myScoreTextContent = document.querySelector(".myScore");
var myScore;
var saveScore=document.getElementById("saveScore");
var shareInvite=document.getElementById("shareInvite")
var response = document.createElement("response");
var initials= [];
var secondsLeft = 120;
var index = 0;
var questions = [];
var count = 0;

//questions[0].choices[2]
//array of questions. index we call on for current and next question. array, object in array(question object-choices[array]-answer object)

questions = [
    
    {
        question: "How many outfits does the production team supply contestants?",
        choices: [
        "All",
        "5",
        "1",
        "None"],
        correctAnswer: 3
    },
    {
        question: "What tests do you have to take before being cast on the show?",
        choices: [
        "Vision",
        "Psychological",
        "Educational",
        "None"],
        correctAnswer: 1
    },
    
    {
        question: "Which of the following can you NOT bring with you?",
        choices: [
        "Bible",
        "Journal",
        "Phone",
        "Craft Supplies"],
        correctAnswer: 2
    },
    {
        question: "The show limits contestants to how many drinks per hour?",
        choices: [
        "1",
        "2",
        "3",
        "No limit"],
        correctAnswer: 1
    },
    {
        question: "Contestants are only allowed to do one of the following:",
        choices: [
        "Bring their own music.",
        "Eat the food on dates.",
        "Watch movies.",
        "Meet with a psychologist"],
        correctAnswer: 3
    },
    
    {
        question: "How many suitcases can you bring?",
        choices: [
        "1",
        "2",
        "3",
        "As many as you want"],
        correctAnswer: 1
    },
    {
        question: "What event takes place at the end of most episodes of The Bachelor/Bachelorette?",
        choices: [
        "Rose Ceremony",
        "Cocktail Party",
        "1-on-1 Date",
        "Engagement"],
        correctAnswer: 1
    },
    {
        question: "Who was the first Latino lead of The Bachelor?",
        choices: [
        "Jake Pavelka",
        "Arie Luyendyk Jr.",
        "Ben Flanjnik",
        "Juan Pablo Galvais"],
        correctAnswer: 3
    },
    {
        question: "Who was the first African-American Lead of The Bachelorette?",
        choices: [
        "Kaitlyn Bristowe",
        "Tayshia Adams",
        "Rachel Lindsay",
        "Madison Prewett"],
        correctAnswer: 2
    },
    {
        question: "How old was the oldest Bachelorette Lead (when her season aired)?",
        choices: [
        "33",
        "35",
        "37",
        "39"],
        correctAnswer: 3
    },
    {
        question: "Who is the oldest Bachelor Lead (when his season aired)?",
        choices: [
        "Arie Luyendyk Jr.",
        "Byron Velvick",
        "Nick Viall",
        "Brad Womack"],
        correctAnswer: 2
    },
]
//default value of startcard is display:none. This shows the card at the beginning and I can remove it after startGame function is called.
startCard.style.display="block";
startAgain.style.display="none";

//startGame function defined. Hide the start button, display 'first' question, start timer.
function startGame() {
    
    startCard.style.display = "none";
    questionCard.style.display = "block";
    resultsCard.style.display = "none";
    startAgain.style.display="block";
    index=0;
    count=0;
    secondsLeft=60;
    if (timerInterval){
        clearInterval(timerInterval);
    }
   
    //displays question and choices
    callQuestion();
    //starts the timer
    setTime();
    //determines question number
    navigate(0);
}
function postToFeed() {
var obj = {
    method: 'share',
    href: 'https://kimberlym4488.github.io/coding-quiz-bachelorette',
    description: "I scored" + count + "on the Bachelor/ette Quiz! Can you beat me?",
    picture: 'https://user-images.githubusercontent.com/92805933/144375458-144636d6-f021-4102-8d8d-d4a1b738b38c.PNG)',
    name: 'Bachelor/ette-Quiz!'       
  };
   FB.ui(obj);
 }

function share() {
    if(navigator.share){
    navigator.share(
    {
      title: "Bachelor/ette Quiz Game!",
      text: "Can you beat my high score of " + count + "?",
      url: "https://kimberlym4488.github.io/coding-quiz-bachelorette",
    })
    .then(() => console.log('Successful share'))
    .catch(error => console.log('Error sharing:', error));
  }
  return;
}
//Start the timer when user clicks start. Want this to be a global function.
function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        //inserts timer element, starting at 120 seconds
        //Advises the user how many seconds are left.
        timeEl.innerHTML = secondsLeft + " seconds remaining";

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
    response.innerHTML="";
    if (secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and send the results message
        results();
    }
    //if my current index point is greater than the length of my question array then I start the results();
    banner.innerHTML=(`Number correct: ${count}`);
    if(index >= questions.length){
        results();
    }
    //if my current index(retrieved from navigate())is lower than the length of my question array I continue on with the game. 
    else{
        //reset the text of the question and choice elements.
        questionEl.innerHTML="";
        choicesEl.innerHTML="";
    
        //reset my count at 1 so it isn't being added twice.
        //count=0;
        questionEl.textContent=questions[index].question;
        
        choicesEl.forEach(function(element,i){
            element.textContent=questions[index].choices[i];
            console.log(element.textContent)
          
//forEach loop allows me to display the two items (element, and index (i) that I want to work with and be able to evaluate)
        }
        );
    }
}
var myChoice; // i is the choices index that the person selected. correctAnswer is the number in the index. How do we turn choices[i] into textContent
function checkAnswer(i){
  
    myChoice=questions[index].choices[i];
    console.log(myChoice)

    console.log(questions[index].correctAnswer === i);
    if (questions[index].correctAnswer === i){
        //increase my count by 1 for the locally stored variable count.
        count++;
        var response = document.createElement("response");
        response.classList.add("correctResponse")
        response.innerHTML=`<br><br>That's right! It's ${myChoice}! <br> Click next to continue.`
        questionEl.append(response);
        console.log(count);//check for errors
    }
    else{
        //change nothing in my count var.
        secondsLeft = secondsLeft-10;
        console.log(questions[index].choices[3])
        var correctChoice=questions[index].choices[3];
        
        response.classList.add("correctResponse")
        response.innerHTML=`<br><br>Sorry, you're incorrect, it was ${correctChoice}! <br> Click next to continue`
        questionEl.append(response);

    }
    
    localStorage.setItem("count",JSON.stringify(count));
   
};
    
//Determines where we are in the index, dependent on when we call navigate with a 0 or 1.
function navigate(direction) {
    index = index + direction;
}
//Navigates +1 in the index and returns to the call question function.
nextQuestion.addEventListener("click", function () {
    navigate(1);
    callQuestion();
});

//Displays how many you got right. Will (eventually) allow you to enter initials with score and save to local storage.
function results() {
    resultsCard.style.display = "block";
    startCard.style.display = "none";
    questionCard.style.display = "none";
    incorrectAnswer.style.display="none";
       
  //Gets the total score from the incremented count value found in CallQuestion function
  //Displays the total score - NEED TO FIX.
}

// The following function renders items in a todo list as <li> elements
function renderInitials() {
    console.log(myScore)
    // Clear initialsList element and update myScore
    myScore = JSON.parse(localStorage.getItem("count")); 
    console.log(myScore);
    initialsList.innerHTML = "";
    myScoreTextContent.textContent = myScore || "no score";
  //it is now a number. myScore variable is grabbed by access to the dom. But once the parse/local storage executes the dom access point is no longer valid, it becomes a number. We are not accessing the dom anymore. 
    // Render a new li for each todo
    for (var i = 0; i < initials.length; i++) {
       // initials = initials[i];
  
      var li = document.createElement("li");
      li.textContent = (`${initials[i].initials} - High Score: ${initials[i].score}`)
      li.setAttribute("data-index", i);
  
      var buttontodo = document.createElement("todobutton");
      buttontodo.style.fontSize ="21px";
      //buttontodo.textContent = (`  - ${myScore}`);
  
      li.appendChild(buttontodo);
      initialsList.appendChild(li);
   
    }
    return;
  }
  
  // This function is being called below and will run when the page loads.
  function init() {
    // Get stored todos from localStorage
    var storedInitials = JSON.parse(localStorage.getItem("userHighScores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedInitials !== null) {
      initials = storedInitials;
    }
    // This is a helper function that will render todos to the DOM
    renderInitials();
  }
  
  function storeInitials() {
      console.log(initials);
      myScore = JSON.parse(localStorage.getItem("count"));
      var initialsText = initialsInput.value;
      initials.push({
          score: myScore,
          initials: initialsText,
      });
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("userHighScores", JSON.stringify(initials));
  
    // Return from function early if submitted todoText is blank
    if (initialsText === "") {
      return;
    }

    // Add new todoText to todos array, clear the input
    initialsInput.value = "";
  
    // Store updated initials in localStorage, re-render the list
  
    renderInitials();
    
  };
  

//takes you back to the start when you click Try Again! SHOULD retain your high score.
shareInvite.addEventListener("click", function(event) {
    event.currentTarget;
    event.preventDefault();
    share();
});

startAgain.addEventListener("click", function(event){
    event.currentTarget;
    saveScore.disabled = false;
    startGame();
});

//calls the start game function when Start is clicked.
startButton.addEventListener("click", function() {
    startGame();
}
);
//what is the difference between putting this here and inside thhe function? here it is screwing up my counts for some reason!
saveScore.addEventListener("click", function(event) {
    event.preventDefault();
    this.disabled = true;
    storeInitials();
});
//add a function here to call the store init()?
  // Calls init to retrieve data and render it to the page on load
  //init();
