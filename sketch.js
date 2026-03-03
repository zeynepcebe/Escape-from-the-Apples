// Lets test the app.
// To see if we did some typo or mistake...

// Now instantiate the game scene via game class
// Declare the variable
var sceneGame;
var sceneIntro;
var startButton;
var sceneEnd;
var retryButton;
var sceneWin;
var gameStartTime = 0;
var gameTotalTime = 60

// define a current variable
// we will have 3 main scenes -> "intro", "game", "end"
var currentScene;

function setup() {
  createCanvas(800, 800);

  sceneIntro = new intro();
  sceneIntro.setImage("background.01.png");

  startButton = new Button(220, height/2)
  startButton.setImage("start.png")
  startButton.addListener(startGame)
  
  
  // Create instance of the game class
  sceneGame = new game();

  // Set current scene
  // This will determine the order of the game scenes...
  currentScene = "intro";
  
    sceneEnd = new intro();
  
  retryButton = new Button(390, height/2 );
retryButton.setImage("oops.tryagain.png"); 
retryButton.addListener(restartGame);
  
  sceneWin = new Button(390, height/2);
  sceneWin.setImage("congratulations.png");
  sceneWin.addListener(restartGame);

  
}
function startGame(){
   currentScene = "game";
  gameStartTime = millis();
  
  
}

function restartGame() {
  
  sceneGame = new game();

  // tekrar oyuna dön
  currentScene = "game";
  gameStartTime = millis();
  currentScene = "game";
}

function draw() {

  // INTRO
  if (currentScene == "intro") {
    background(250);
    sceneIntro.display();
    startButton.draw();
    return;
  }

  // GAME 
  if (currentScene == "game") {
    sceneGame.display();

    
    
    if (currentScene == "end") {
      sceneEnd.display();     
      retryButton.draw();
     return;
    }

    
    if (currentScene == "win") {
      sceneWin.draw();
    return;
    
    }

   
    var cTime = floor((millis() - gameStartTime) / 1000);
    var timeLeft = gameTotalTime - cTime;

    push();
    noStroke();
    fill(0, 160);
    rect(0, 0, width, 52);

    fill(255);
    textSize(24);
    textAlign(LEFT, CENTER);
    text("TIME: " + max(0, timeLeft), 20, 28);
    pop();

    // Süre bitti -> WIN
    if (timeLeft <= 0) {
      sceneGame.frozen = true;
      sceneGame.player.disable();
      currentScene = "win";
    }

    return;
  }

  // LOSE
  if (currentScene == "end") {
    sceneEnd.display();
    retryButton.draw();
    return;
  }

  // WIN
  if (currentScene == "win") {
    sceneWin.draw ();
    return;
  }
}
  
  
  // Render End Scene
  if (currentScene == "end") 
  sceneEnd.display(); {
    
    if (currentScene == "end") {
  sceneEnd.display();
  retryButton.draw();
      
      if (currentScene == "end") {
  sceneGame.display();   
  retryButton.draw();    
      if (currentScene == "end") {
  sceneEnd.display();    
  retryButton.draw();    
}
}
}
  
}

function keyPressed() {
  if (key === "s") {
    // Use the following naming convention while uploading the images.
    saveCanvas("week4-assignment-alptugan.jpg");
  }
}
