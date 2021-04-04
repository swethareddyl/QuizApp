var questiontext = document.querySelector(".question"); 
var choiceList = document.querySelector(".choiceList");
var nextButtonClick = document.querySelector(".nextButton");
var preButtonClick = document.querySelector(".preButton");
var quizMsg = document.querySelector(".quizMessage");

var questions = [{
  question: "1. How do you write 'Hello World' in an alert box?",
  choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
  correctAnswer: 3
}, {
  question: "2. How to empty an array in JavaScript?",
  choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
  correctAnswer: 2
}, {
  question: "3. What function to add an element at the begining of an array and one at the end?",
  choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
  correctAnswer: 1
}, {
  question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
  choices: ["undefined", "0", "prints nothing", "Syntax error"],
  correctAnswer: 0
}, {
  question: "5. What would following code return? console.log(typeof typeof 1);",
  choices: ["string", "number", "Syntax error", "undefined"],
  correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c=30;
var t;

document.addEventListener('DOMContentLoaded',function()
{
  // Display the first question
  displayCurrentQuestion();
  //hide the display msg and disable the previous button for 1st question
  document.getElementById("quizMessage").style.display = "none";
  document.getElementById("preButton").disabled = true;
  //call timer
  timedCount();

  // On clicking next, display the next question
  nextButtonClick.addEventListener("click", function()
  {
    if (!quizOver) 
    {
      var val = document.querySelector("input[type='radio']:checked");
      if (val == null) 
      {
        quizMsg.textContent =  "Please select an answer";
        document.getElementById('quizMessage').style.display = "block";
      } else 
      {
        var val = document.querySelector("input[type='radio']:checked").value;
        document.getElementById('quizMessage').style.display = "none";
        //capture the correct answer number  
          if (val == questions[currentQuestion].correctAnswer) 
          {
            correctAnswers++;
          }
          //reduce timer by 5 secs if the answer is wrong
          else if (val != questions[currentQuestion].correctAnswer)
          {
            if (c >= 1) {
              c = c - 5;
            }  
          }
          iSelectedAnswer[currentQuestion] = val;
          currentQuestion++; // Since we have already displayed the first question on DOM ready
          if(currentQuestion >= 1) {
            //preButtonClick.show();
            document.getElementById("preButton").show = true;
            document.getElementById("preButton").disabled = false;
          }
          if (currentQuestion < questions.length) 
          {
            displayCurrentQuestion();
          } 
          else 
          {
            //displayScore();
            document.querySelector("#iTimeShow").textContent= "Quiz Time Completed! ";
            var txtTimerScore = "You scored: " + correctAnswers + " out of: " + questions.length;
            document.querySelector("#timer").textContent = txtTimerScore;
            document.querySelector(".result").textContent = "Game Over!";
            document.querySelector(".result").style.display = "block";
            document.getElementById('quizMessage').style.display = "none";
            c=185;
            document.getElementById("preButton").show = false;
            document.getElementById("nextButton").textContent = "Play Again?";
            quizOver = true;
            return false;   
            }
            }    
    } else 
    { 
      quizOver = false; 
      document.querySelector("#iTimeShow").textContent = "Time Remaining: ";
      iSelectedAnswer = [];
      document.getElementById("nextButton").textContent = "Next";
      document.getElementById("preButton").textContent = "Back";
      document.getElementById('preButton').show = false;
      resetQuiz();
      viewingAns = 1;
      displayCurrentQuestion();
      hideScore();
  }
  });
});

// On clicking previous, display the previous question
preButtonClick.addEventListener("click", function()
{		
      if (!quizOver) 
      {
        if(currentQuestion == 0) 
        { 
          return false; 
        }
        if(currentQuestion == 1) 
        {
          document.getElementById("preButton").disabled = true;
        }
          currentQuestion--; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) 
        {
          displayCurrentQuestion();
        } 					
      } else {
      if(viewingAns == 3) { return false; }
        currentQuestion = 0; viewingAns = 3;
      }
});

//timer function 
function timedCount()
{
  if(c == 185) 
  { 
    return false; 
  }
  var hours = parseInt( c / 3600 ) % 24;
  var minutes = parseInt( c / 60 ) % 60;
  var seconds = c % 60;
  var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
  document.querySelector("#timer").textContent = result;
  if(c <= 0 )
  {
        document.querySelector("#iTimeShow").textContent = "Quiz Time Completed! ";
        var txtTimerScore = "You scored: " + correctAnswers + " out of: " + questions.length;
        document.querySelector("#timer").textContent = txtTimerScore;
        document.querySelector(".result").textContent = "Game Over!";
        document.querySelector(".result").style.display = "block";
        document.getElementById('quizMessage').style.display = "none";
        c=185;
        document.getElementById("nextButton").textContent = "Play Again?";
        quizOver = true;
        return false;
  }
  c = c - 1;
  t = setTimeout(function()
  {
    timedCount()
  },1000);
}

// Function to display the current question and the choices
function displayCurrentQuestion() 
{
  if(c == 185) { c = 30; timedCount(); }
    var question = questions[currentQuestion].question;
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    questiontext.textContent = question;
    
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
    //loop through choices for the current question and add the list item, append to ul
    for (i = 0; i < numChoices; i++) 
    {
      choice = questions[currentQuestion].choices[i];
      if(iSelectedAnswer[currentQuestion] == i) {
       $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      } else {
       $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      }
    }
}

function resetQuiz()
{
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function hideScore() 
{
  $(document).find(".result").hide();
}


