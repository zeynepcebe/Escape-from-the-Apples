class apple {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.Image = loadImage("apple.png")


    
    this.speed = random(1, 2);
  }

  display() {
    angleMode(DEGREES);

    push();
    image(this.Image, this.x, this.y )
    
 
    
    pop();
  }
}
