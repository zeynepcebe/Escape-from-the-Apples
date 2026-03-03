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

    // Bind the event handlers to maintain proper 'this' context
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setImage(_gifPath);
    
    this.enable();
  }

  setImage(gifPath) {
    // Remove previous image if exists
    if (this.image) {
      this.image.remove();
    }

    // Create new image element
    this.image = createImg(gifPath, "");

    // Style the image element
    this.image.style("position", "absolute");
    this.image.style("pointer-events", "none");

    // If size was set before image, apply it now
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
      // Account for canvas position
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
    if (this.enabled) {
      const rect = canvas.getBoundingClientRect();
      if (this.keys.ArrowRight) {
        this.x += this.speed;
        if(this.x >= rect.x + rect.width - this.width) this.x = rect.x + rect.width - this.width;
      }
      if (this.keys.ArrowLeft) {
        this.x -= this.speed;
        if(this.x <= rect.x) this.x = rect.x;
      }
      // Update image position
      if (this.image) {
        let canvas = document.querySelector("canvas");
        this.image.position(this.x + rect.x + rect.left, this.y + rect.y + rect.top);
      }
    }
  }

  draw() {
    if (this.image && this.enabled) {
      this.update();
    }
  }
}