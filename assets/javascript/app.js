// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Homework JS Assignment 2 - Trivia Game - Himanshu Pandit
// December 8, 2018

// Here we keep global variables
var myGuessTotal = 0;
var computerGuess = 0;
var myWins = 0;
var myLoss = 0;
var crystalGuess = [0, 0, 0, 0];

function processClick(number)
{
  if (crystalGuess[number-1] === 0)
  {
    crystalGuess[number-1] = Math.floor(Math.random() * 12);
  }

  myGuessTotal = myGuessTotal + crystalGuess[number-1];
  $('#lblYourGuess').text(myGuessTotal);

  if (myGuessTotal === computerGuess) {
      myWins++;
      resetGame();
  }

  if (myGuessTotal > computerGuess) {
      myLoss++;
      resetGame();
  }
}
 
function resetGame()
{
  var min = 19;
  var max = 120;

  computerGuess = Math.floor(Math.random() * (max - min) + min);
  myGuessTotal = 0;
  crystalGuess = [0, 0, 0, 0];

  $('#lblWin').text(myWins);
  $('#lblLoss').text(myLoss);
  $('#lblComputerGuess').text(computerGuess);
  $('#lblYourGuess').text(myGuessTotal);
}

$(document).ready(function() 
{
  $("#crystal1").on("click", function() {
    processClick(1);
  });

  $("#crystal2").on("click", function() {
    processClick(2);
  });

  $("#crystal3").on("click", function() {
    processClick(3);
  });

  $("#crystal4").on("click", function() {
    processClick(4);
  });

  resetGame();   
});