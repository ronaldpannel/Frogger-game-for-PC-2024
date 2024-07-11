class Frogger {
  constructor(game) {
    this.game = game;
    this.x = this.game.width / 2;
    this.y = this.game.height - this.game.cellSize;
    this.width = this.game.cellSize * 0.9;
    this.height = this.game.cellSize * 0.9;
    this.speed = this.game.cellSize;
    this.frogImg = document.getElementById("frogImg");
    this.spriteWidth = 250;
    this.spriteHeight = 250;
    this.frameX = 0;
    this.frameY = 0;
  }
  update() {
    if (
      (this.y < this.game.cellSize * 5 &&
        this.y > this.game.cellSize &&
        this.x < 0 - this.game.cellSize) ||
      this.x > this.game.width
    ) {
      this.reset();
    }
  }
  draw() {
    if (this.game.debug) {
      this.game.ctx2.fillStyle = "blue";
      this.game.ctx2.fillRect(this.x, this.y, this.width, this.height);
    }
    this.game.ctx2.drawImage(
      this.frogImg,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteWidth,
      this.x - this.game.cellSize * 0.5,
      this.y - this.game.cellSize * 0.5,
      this.game.cellSize * 2,
      this.game.cellSize * 2
    );
  }
  moveUp() {
    this.frameY = 0;
    this.x += 0;
    this.y += -this.speed;
  }
  moveDown() {
    this.frameY = 3;
    this.x += 0;
    this.y += this.speed;
  }
  moveLeft() {
    this.frameY = 2;
    this.x += -this.speed;
    this.y += 0;
  }
  moveRight() {
    this.frameY = 1;
    this.x += this.speed;
    this.y += 0;
  }
  scored() {
    this.x = this.game.width / 2;
    this.y = this.game.height - this.game.cellSize;
    this.game.score++;
    this.game.gameSpeed += 0.5;
  }
  reset() {
    this.x = this.game.width / 2;
    this.y = this.game.height - this.game.cellSize;
    this.game.score = 0;
    this.game.gameSpeed = 0.5;
  }
}
