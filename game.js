"use-strict";

let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let randomChosenColour;
let level = 1;
let started = false;

// Provide next colour sequence...
const nextSequence = function (max) {

  level++;
  let num = Math.floor(Math.random() * (max + 1));
  console.log(num);
  randomChosenColour = buttonColours[num];

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
};

// to play sound...
const playSound = function(name){
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// to animate the button...
const animatePress = function(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
}

$(".btn").click(function (e) {
    const chosenColor = e.target.id;
    const seqNum = e.target.dataset.seq;
    playSound(chosenColor);
    animatePress(chosenColor);
    userClickedPattern.push(chosenColor);
    checkAnswer(userClickedPattern.length-1);
//   console.log($(this).attr("id"));
});


// Start the Game...
$(document).keypress(function(e){
    if(!started){
        $("h1").text(`Level ${level}`);
        nextSequence(3);
    }
    started = true;
    
})

// Function to check the answer...
const checkAnswer = (seq) => {
    if(userClickedPattern[seq] === gamePattern[seq]){
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            // console.log('success');
            setTimeout(function(){
            $("h1").text(`Level ${level}`);
            nextSequence(3);
        }, 1000);
        }
    }else{
        // console.log('failure');
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}

// Reset Game...
const startOver = function(){
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
