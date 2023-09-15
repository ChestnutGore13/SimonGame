let correctSeq = [];
let userSeq = [];
let nextBtn;
let gameOver = false;
let userTurn;
let correctSeqColors = [];
let userSeqColors = [];

function nextButton() {
  $(".lvltext").text("Level: " + (correctSeq.length + 1));
  gameOver = false;
  userTurn = false;
  userSeq = [];
  userSeqColors = [];
  nextBtn = Math.floor(Math.random() * 4) + 1;
  switch (nextBtn) {
    case 1:
      correctSeqColors.push("green");
      break;
    case 2:
      correctSeqColors.push("red");
      break;
    case 3:
      correctSeqColors.push("yellow");
      break;
    case 4:
      correctSeqColors.push("blue");
      break;
    default:
      break;
  }
  correctSeq.push(nextBtn);
  playGameSeq();
}

function playButton(n) {
  playSound(n);
  flashButton(n);
}

function playSound(n) {
  let btnSound = new Audio("./sounds/" + n + ".mp3");
  btnSound.play();
}

function flashButton(n) {
  $("#" + n)
    .fadeOut(100)
    .fadeIn(100);
}

$("#startbtn").on("click", function () {
  $("#startbtn").hide();
  $("#game-title").slideUp();
  $(".correctSeq").remove();
  $(".userSeq").remove();
  correctSeq = [];
  setTimeout(function () {
    nextButton();
  }, 400);
});

function playGameSeq() {
  for (let i = 0; i < correctSeq.length; i++) {
    setTimeout(function () {
      playButton(correctSeq[i]);
    }, i * 400);
  }
  setTimeout(function () {
    userTurn = true;
  }, correctSeq.length * 400);
}

$(".btn").on("click", function () {
  if (!gameOver && userTurn) {
    pressButton(this.id);
    userSeq.push(this.id);
    switch (this.id) {
      case "1":
        userSeqColors.push("green");
        break;
      case "2":
        userSeqColors.push("red");
        break;
      case "3":
        userSeqColors.push("yellow");
        break;
      case "4":
        userSeqColors.push("blue");
        break;
      default:
        break;
    }
    gameOver = checkUserAnswer(userSeq.length - 1);
    if (!gameOver && userSeq.length === correctSeq.length) {
      setTimeout(function () {
        nextButton();
      }, 400);
    } else if (gameOver) {
      gameOverSeq();
    }
  }
});

function pressButton(e) {
  playSound(e);
  animatePress(e);
}

function animatePress(e) {
  $("#" + e).addClass("pressed");
  setTimeout(function () {
    $("#" + e).removeClass("pressed");
  }, 50);
}

function checkUserAnswer(n) {
  if (userSeq[n] != correctSeq[n]) {
    return true;
  } else {
    return false;
  }
}

function gameOverSeq() {
  let btnSound = new Audio("./sounds/wrong.mp3");
  btnSound.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 50);
  $("#startbtn").slideDown();
  $("#game-title").slideDown();
  $("#game-title").html("Game Over!");
  $(".text").text("You made it to level " + correctSeq.length);
  printSeqs();
  correctSeq = [];
  userSeq = [];
}

function printSeqs() {
  $(".lvltext").after(
    "<h3 class='text correctSeq'>Correct sequence was: " +
      correctSeqColors +
      "</h3>"
  );
  correctSeqColors = [];
  $(".correctSeq").after(
    "<h3 class='text userSeq'>You pressed: " + userSeqColors + "</h3>"
  );
  userSeqColors = [];
}
