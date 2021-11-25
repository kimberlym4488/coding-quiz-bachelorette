var container = document.querySelector(".container");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector(".questions")
var correctAnswer = document.querySelector(".correctAnswer")
var nextQuestion = document.querySelector("#nextQuestion")


container.addEventListener("click", function(e){
    startButton.style.cssText = "background-color: #05668D; color:#F0F3BD;"
    nextQuestion.style.cssText = "background-color: #05668D; color:#F0F3BD;"
    navigate(0);

}
)





questions = [
    { question: "What is the occupation of Michelle Young as of 2021?",
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