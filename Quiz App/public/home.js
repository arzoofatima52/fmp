var displayQuestion = document.getElementById("displayQuestion");
var answerParent = document.getElementById("answerParent");
var currentQuestion = document.getElementById("currentQuestion");
var totalQuestions = document.getElementById("totalQuestions");
var result = document.getElementById("result");
var questionDisplay = document.getElementById("questionDisplay");
var marks = document.getElementById("marks");
var percentage = document.getElementById("percentage");
var comment = document.getElementById("comment");
var startQuiz = document.getElementById("startQuiz");
var rightans = document.getElementById("rightans");
var indexValue = 0;
var score = 0;
var questions = [
    {
        question:" What is the capital of Australia?",
        options: ["Canberra","Sydney","Melbourne","Adelaide"],
        correctAns: "Sydney"
    },
    {
        question:"HTML stands for ______________ .",
        options: ["HyperText Markup Language","HyperText Makeup Language","HyperText Markup Lang","HyperText Mark Language"],
        correctAns: "HyperText Markup Language"
    },
    {
        question:"The smallest Ocean is ______________ .",
        options: ["Pacific Ocean","Arctic Ocean","Indian Ocean","Atlantic Ocean","the Southern Ocean"],
        correctAns: "Arctic Ocean"
    },
    {
        question:"The element common to all acids is what?",
        options: ["hydrogen","carbon","sulphur","oxygen"],
        correctAns: "Random Access Memory"
    },
    {
        question:"SI unit of Force is ______________ .",
        options: ["Candela","Ampere","Newton","Newton Meter"],
        correctAns: "Newton"
    },
    {
        question:"Smallest number among the numbers given below is ______________ .",
        options: ["34","33.02","33.3","34.1"],
        correctAns: "33.02"
    },
    {
        question:"After Alaska, which US state has the longest coastline?.",
        options: ["Florida","Melbourne","Canberra","Adelaide"],
        correctAns: "Read Only Memory"
    },
    {
        question:"SQL stands for ______________ .",
        options: ["Structured Query Lang","Structured Query Language","Struct Query Language","Structured Queen Language"],
        correctAns: "Structured Query Language"
    },
    {
        question:"DOM stands for ______________  .",
        options: ["Document Object Model","Doc Object Model","Document Object Mode","Document Obstacle Model"],
        correctAns: "Document Object Model"
    },
    {
        question:"JS stands for ______________ .",
        options: ["Java Script","Java Science","Just Script","Java Screen"],
        correctAns: "Java Script"
    },
]


function starting(){
    startQuiz.style.display = "none";
    questionDisplay.style.display = "block";
}
function renderQuestion(){
    displayQuestion.innerHTML = questions[indexValue].question;
    for(var i=0; i<questions[indexValue].options.length;i++){
        answerParent.innerHTML +=`<div class="col-md-6"><button onclick="nextQuestion('${questions[indexValue].options[i]}','${questions[indexValue].correctAns}')"id = "btns" class="btn btnn bg-secondary shadow w-100 rounded-pill text-white p-3 my-3 d-flex text-align-center">${questions[indexValue].options[i]}</button></div>`
      
    }
    totalQuestions.innerHTML = questions.length;
    currentQuestion.innerHTML = indexValue + 1;
}
renderQuestion();
function nextQuestion(optionValue,correctValue){
    answerParent.innerHTML = "";
   if(optionValue != correctValue){
    alert("You're wrong!, the correct answer is " + correctValue);
   }
    if(optionValue == correctValue){
        score++;
        marks.innerHTML = score;
    }
    if(indexValue + 1 == questions.length){
        var per = score/questions.length*100;
        percentage.innerHTML = per.toFixed(2); 
        if(per >= 80){
            comment.innerHTML = "Congratulations! You did Great";
            comment.style.color = "lightgreen";
        }
        else if(per >= 60 && per <80){
            comment.innerHTML = "You Passed!";
            comment.style.color = "Yellow";
        }else{
            comment.innerHTML = "You Failed!";
            comment.style.color = "Red";
        }
        result.style.display = "block";
        questionDisplay.style.display = "none";
       
    }else{
        indexValue++;
        renderQuestion();
    }
}
function logout(){
    firebase.auth().signOut().then(function() {
        console.log("sucessful logout")
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      window.location.replace("index.html");
}

