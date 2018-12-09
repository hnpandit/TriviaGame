// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Homework JS Assignment 2 - Trivia Game - Himanshu Pandit
// December 8, 2018

// Global variables
var qCount = 0;
var timeRemaining = 0;
var maxTimeAllowed = 10;
var maxQuestions = 5;
var myInterval = 0;
var isGameOver = false;

var strQ1 = "Who was the first president of the united states of america?";
var strQ2 = "Which of these presidents had  a son who was the 6th president of the United States of America?";
var strQ3 = "What was the Gettysburg Adress about?";
var strQ4 = "Which of these presidents loved cornbread?";
var strQ5 = "Which one of these presidents has met Hellen Keller?";

var strA1 = ["James Madison", "Barack Obama", "George Washington", "John Adams"];
var strA2 = ["James Madison", "John Adams", "Theodore Roosevelt", "George Washington"];
var strA3 = ["Slavery (Saying that it should still keep going)", "Freedom", "Dedication to soldiers who fought in war", "Social status"];
var strA4 = ["Ronald Regan", "James Madison", "John Quincy Adams", "John F. Kennedy"];
var strA5 = ["William McKinley", "Herbert Hoover", "Ulysses S. Grant", "John F. Kennedy"];

function updateTime()
{
    timeRemaining = timeRemaining - 1;
    triviaGame.refreshTimer();
    if (timeRemaining === 0)
    {
      strMessage = "Oops! You ran out of time. ";
      triviaGame.displayMessage(strMessage);
      triviaGame.nextQuestion();
    }
};

myInterval = setInterval(updateTime, 1000);

// Object triviaGame
var triviaGame = {  

  questions: [strQ1, strQ2, strQ3, strQ4, strQ5],
  answers: [strA1, strA2, strA3, strA4, strA5],
  keys: [2, 1, 2, 2, 3],
  responses: [],
  numCorrect: 0,

  refreshTimer: function() {
    $('#lblTimeRemaining').text(timeRemaining);
  },

  displayMessage: function() {
    $('#lblInfo').text(strMessage);
  },

  resetQuestion: function() {
    var strText = qCount + 1;
    strText = strText + ".  " + triviaGame.questions[qCount];
    $('#lblQuestion').text(strText);
    $('#btnAnsChoice1').text(triviaGame.answers[qCount][0]);
    $('#btnAnsChoice2').text(triviaGame.answers[qCount][1]);
    $('#btnAnsChoice3').text(triviaGame.answers[qCount][2]);
    $('#btnAnsChoice4').text(triviaGame.answers[qCount][3]);
  },

  startGame: function() {
      qCount = -1;
      isGameOver = false;
      timeRemaining = maxTimeAllowed;
      strMessage = "";
      this.responses = [];
      this.numCorrect = 0;
      this.displayMessage();
      //this.resetQuestion();
      this.refreshTimer();
      this.nextQuestion();
  },

  processResponse: function(response) {
    triviaGame.responses.push(response);
    if (response === triviaGame.keys[qCount])
    {
      this.numCorrect++;
      strMessage = "Congratulations. " + "The correct answer indeed is " + this.answers[qCount][this.keys[qCount]] +  ".";
      triviaGame.displayMessage(strMessage);
    }
    else 
    {
      strMessage = "Opps! Your answer is not correct. " + "The correct answer is " + this.answers[qCount][this.keys[qCount]] + ".";
      triviaGame.displayMessage(strMessage);
    }
    this.nextQuestion();
  },

  nextQuestion: function() {
    clearInterval(myInterval);
    qCount = qCount + 1;
    if (qCount == maxQuestions)
    {
      var incorrect;
      isGameOver = true;
      strMessage = "Game is over. " + "You answered " + triviaGame.numCorrect + " correct answers and ";
      incorrect = maxQuestions - triviaGame.numCorrect;
      strMessage = strMessage + incorrect + " incorrect answers. "
      strMessage = strMessage + " Click Me to start game again!!!"
      triviaGame.displayMessage(strMessage);
    }
    else 
    {
      timeRemaining = maxTimeAllowed;
      this.resetQuestion();
      this.refreshTimer();
      if (qCount != maxQuestions)
        myInterval = setInterval(updateTime, 1000);
      }
  }
};

$(document).ready(function() 
{
    $("#btnAnsChoice1").on("click", function() {
      if (isGameOver != true ) triviaGame.processResponse(0);
    });

    $("#btnAnsChoice2").on("click", function() {
      if (isGameOver != true ) triviaGame.processResponse(1);
    });

    $("#btnAnsChoice3").on("click", function() {
      if (isGameOver != true ) triviaGame.processResponse(2);
    });

    $("#btnAnsChoice4").on("click", function() {
      if (isGameOver != true ) triviaGame.processResponse(3);
    });

    $("#lblInfo").on("click", function() {
      if (isGameOver == true ) triviaGame.startGame();
    });
});

// Start game here...
triviaGame.startGame();
