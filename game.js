class game {
  // Move the contents in setup function to constructor in the class
  constructor() {
    this.numItems = 10; // number of objects
    this.faceArray = []; // array to hold 40 objects

    this.bg = loadImage("game.background.png");

    for (var i = 0; i < this.numItems; i++) {
      // Instatiate the object for each array element - circleFace class
      this.faceArray[i] = new apple();

      // Set position of each array object to random canvas postions
      this.faceArray[i].x = random(122, 576);
      this.faceArray[i].y = random(79, 287);
      // Create player instance
      this.player = new Player("game.mushroom.png", 350, 700);
      this.player.setSize(60, 60); // width: 100px, height: 100px
      this.frozen = false;

      
      // Set movement speed
      this.player.setSpeed(0.5);
    }
  }

  // Move the codes in draw() function to the display() function in the class
  display() {
    image(this.bg, 0, 0);
    for (var i = 0; i < this.numItems; i++) {
      // update position of each face object to make them move downwards
      this.faceArray[i].y = this.faceArray[i].y + this.faceArray[i].speed;
      let ax = this.faceArray[i].x;
let ay = this.faceArray[i].y;

let px = this.player.x;
let py = this.player.y;
let pw = this.player.width;
let ph = this.player.height;

if (ax > px && ax < px + pw && ay > py && ay < py + ph) {
  this.frozen = true;     
  this.player.disable();  
  currentScene = "end";    
  return;
}

      // Check if the position of any object greater than the height of the canvas.
      // That means it is out of the canvas.
      // So we move it to the top again.
      // And make it move again to down.
      if (this.faceArray[i].y > height) {
        this.faceArray[i].y = random(79, 287);
      }

      // Display the objects assigned to the faceArray
      this.faceArray[i].display();

      this.player.draw();
      
      if (this.frozen) {
  image(this.bg, 0, 0);
  this.player.draw(); 
  for (let i = 0; i < this.numItems; i++) {
    this.faceArray[i].display();
    
  }
  return;
}
      
      
    }
  }
}
