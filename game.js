var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
if (!started)
{
$('#level-title').text("Level" + level);
nextSequence();
started = true;
  
}
  
});

$( ".btn" ).click(function() {
    
    //stores the id when clicked
    var userChosenColour = $(this).attr("id");

    //pushes it to the arrap
    userClickedPattern.push(userChosenColour);

    //plays the sound of the user clicked button
  playSound(userChosenColour);
  animatePress(userChosenColour);

// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length-1);

  })

  function checkAnswer(currentLevel){
    //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");

      //If the user got the most recent answer right from above, then check that they have finished their sequence with another if statement.
    if(userClickedPattern.length === gamePattern.length){
  //Call nextSequence() after a 1000 millisecond delay.
  setTimeout(function () {
    nextSequence();
  }, 1000);
    }
}
  else{
    console.log("wrong");

    playSound("wrong");

    

// adds the game over class from styles.css when user gets wrong
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

          //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
          $("#level-title").text("Game Over, Press Any Key to Restart");

          startOver();

  }
  
  }



function nextSequence(){

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

//makes the random button flash
$("#" + randomChosenColour).delay(100).fadeOut(100).fadeIn('slow');

//makes sounds of the random flashed coloured buttons
playSound(randomChosenColour);

}

function playSound(name) {

  //makes sounds of the random flashed coloured buttons
var audio = new Audio('sounds/'+ name + '.mp3');
audio.play();

}

function animatePress(currentColor){

  
    $(currentColor).addClass("pressed");
    setTimeout(function(){ 
      $('#' +currentColor).removeClass("pressed"); 
    }, 100);

}


function startOver(){
level = 0;
gamePattern=[];
started = false;

}