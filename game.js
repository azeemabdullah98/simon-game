"use-strict";

let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let randomChosenColour;
let level = 1;
let started = false;
let resetButton = false; // variable applicable only for smaller displays...

// Provide next colour sequence...
const nextSequence = function (max) {
  level++;
  let num = Math.floor(Math.random() * (max + 1));
  console.log(num);
  randomChosenColour = buttonColours[num];

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

// to play sound...
const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

// to animate the button...
const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

$(".btn").click(function (e) {
  const chosenColor = e.target.id;
  playSound(chosenColor);
  animatePress(chosenColor);
  userClickedPattern.push(chosenColor);
  checkAnswer(userClickedPattern.length - 1);
  //   console.log($(this).attr("id"));
});

// Start the Game...
$(document).keypress(function () {
  if (!started) {
    $("h1").text(`Level ${level}`);
    nextSequence(3);
  }
  started = true;
});

// For smaller display (mobile phoones)...
$(".btn-start").click(function () {
  if (!started) {
    $(".btn-start").css("display", "none"); // hide the start button after it has been clicked...
    $("#level-title").css("display", "block");
    $("h1").text(`Level ${level}`);
    resetButton = true;
    nextSequence(3);
  }
  started = true;
});

// Function to check the answer...
const checkAnswer = (seq) => {
  if (userClickedPattern[seq] === gamePattern[seq]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        // execute the next sequence after 1s...
        $("h1").text(`Level ${level}`);
        nextSequence(3);
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over"); // remove the game-over class from the body after 200ms
    }, 200);
    // applicable for smaller displays (mobile phones)...
    if (resetButton) {
      $(".btn-reset").removeClass("hidden-reset"); // hide reset button...
      $("h1").text("Game Over, Press the button to restart");
    } else {
      $("h1").text("Game Over, Press Any Key to Restart");
    }
    startOver(); // function to reset to initial values...
  }
};

// Restart the Game (for larger displays)...
const startOver = function () {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
};

// Restart the game (for smaller displays)...
$(".btn-reset").click(function () {
  $(".btn-reset").addClass("hidden-reset"); // hide the reset button...
  $(".btn-start").css("display", "inline-block"); // unhide the play button...
  $("h1").css("display", "none"); // hide the h1 element...
});
