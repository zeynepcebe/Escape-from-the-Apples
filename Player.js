class Player {
  constructor(_gifPath, _x, _y, _w = 0, _h = 0) {
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h;
    this.speed = 1;
    this.image = null;
    this.enabled = false;
    this.keys = {
      ArrowRight: false,
      ArrowLeft: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setImage(_gifPath);

    this.enable();
  }

  setImage(gifPath) {
    if (this.image) {
      this.image.remove();
    }

    this.image = createImg(gifPath, "");
    this.image.style("position", "absolute");
    this.image.style("pointer-events", "none");

    if (this.width && this.height) {
      this.setSize(this.width, this.height);
    }
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    if (this.image) {
      this.image.size(width, height);
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;

    if (this.image) {
      let canvas = document.querySelector("canvas");
      let rect = canvas.getBoundingClientRect();
      this.image.position(this.x + rect.left, this.y + rect.top);
    }
  }

  enable() {
    if (!this.enabled) {
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("keyup", this.handleKeyUp);
      this.enabled = true;
      this.image.show();
    }
  }

  disable() {
    if (this.enabled) {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
      this.enabled = false;
      this.image.hide();
    }
  }

  handleKeyDown(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = true;
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = false;
      event.preventDefault();
    }
  }

  update() {
  if (!this.enabled) return;

  if (this.keys.ArrowRight) {
    this.x += this.speed;
  }

  if (this.keys.ArrowLeft) {
    this.x -= this.speed;
  }

  // always constrain the player
  this.x = constrain(this.x, 0, width - this.width);

  if (this.image) {
    let canvasEl = document.querySelector("canvas");
    let rect = canvasEl.getBoundingClientRect();
    this.image.position(rect.left + this.x, rect.top + this.y);
  }
}


  draw() {
    if (this.image && this.enabled) {
      this.update();
    }
  }
}
