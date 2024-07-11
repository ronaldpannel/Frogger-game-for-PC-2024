class Particle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.radius = Math.random() * 10 + 3;
    this.opacity = 1;
  }
  draw() {
    this.game.ctx2.fillStyle = `rgba(150,150,150,${this.opacity})`;
    this.game.ctx2.beginPath();
    this.game.ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.game.ctx2.fill();
  }
  drawRipples() {
    this.game.ctx1.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    this.game.ctx1.beginPath();
    this.game.ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.game.ctx1.stroke();
  }
  update() {
     this.x += this.speedX;
     this.y += this.speedY;
    if (this.opacity > 0.1) {
      this.opacity -= 0.01;
    }
   
  }
  ripplesUpdate() {
    if(this.radius < 50){
      this.radius += 0.5
      this.x -= 0.03
      this.y -= 0.03
    }
    if(this.opacity > 0){
      this.opacity -= 0.01
    }
  }
}
