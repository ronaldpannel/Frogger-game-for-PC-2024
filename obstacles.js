class Obstacle {
  constructor(game, x, y, width, height, speed, type) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.randomize = Math.floor(Math.random() * 10 + 10)
    this.logSpriteWidth = 180;
    this.logSpriteHeight = 80;
    this.carSpriteWidth = 160;
    this.carSpriteHeight = 80;
    this.carFrameX = 0;
    this.carFrameY = Math.floor(Math.random() * 3);
    this.turtleSpriteWidth = 70;
    this.turtleSpriteHeight = 70;
    this.turtleFrameX = 0;
    this.turtleFrameY = 0;

    this.logImg = document.getElementById("logImg");
    this.carImg = document.getElementById("carImg");
    this.turtleImg = document.getElementById("turtleImg");
  }
  draw() {
    if (this.game.debug) {
      this.game.ctx2.fillStyle = "yellow";
      this.game.ctx2.fillRect(this.x, this.y, this.width, this.height);
    }

    if (this.type === "log") {
      this.game.ctx2.drawImage(
        this.logImg,
        0,
        0,
        this.logSpriteWidth,
        this.logSpriteHeight,
        this.x,
        this.y,
        this.game.cellSize * 2.2,
        this.game.cellSize
      );
    } else if (this.type === "car") {
      this.game.ctx2.drawImage(
        this.carImg,
        this.carFrameX * this.carSpriteWidth,
        this.carFrameY * this.carSpriteHeight,
        this.carSpriteWidth,
        this.carSpriteHeight,
        this.x,
        this.y,
        this.game.cellSize * 2,
        this.game.cellSize
      );
    } else if (this.type === "turtle") {
      this.game.ctx2.drawImage(
        this.turtleImg,
        this.turtleFrameX * this.turtleSpriteWidth,
        this.turtleFrameY * this.turtleSpriteHeight,
        this.turtleSpriteWidth,
        this.turtleSpriteHeight,
        this.x,
        this.y,
        this.game.cellSize,
        this.game.cellSize
      );
    }
  }
  update() {
    this.x += this.speed * this.game.gameSpeed;
    // edges

    if (this.speed > 0) {
      if (this.x > this.game.width) {
        this.x = 0 - this.game.cellSize * 2;
        this.carFrameX = 0;
        this.carFrameY = Math.floor(Math.random() * 3);
      }
    } else {
      if (this.x < 0 - this.game.cellSize * 2) {
        this.x = this.game.width;
        this.carFrameX = 1;
        this.carFrameY = Math.floor(Math.random() * 3);
      }
    }
    if (this.game.turtleTimer % this.randomize == 0) {
      if (this.turtleFrameX < 1) {
        this.turtleFrameX++;
      } else {
        this.turtleFrameX = 0;
      }
    }
  }
}
