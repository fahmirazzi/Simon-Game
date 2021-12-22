let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let startGame = false;

function nextSequence() {
  userClickPattern = [];
  level++;
  let randomNumber = Math.floor(Math.random() * buttonColors.length);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function () {
  if (!startGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startGame = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length == userClickPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio = new Audio("sounds/wrong.mp3");

    $("h1").text("Game Over, press A to restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  startGame = false;
}
