/**@type{HTMLCanvasElement} */
class Game {
  constructor(
    canvas1,
    context1,
    canvas2,
    context2,
    canvas3,
    context3,
    canvas4,
    context4
  ) {
    this.canvas1 = canvas1;
    this.ctx1 = context1;
    this.canvas2 = canvas2;
    this.ctx2 = context2;
    this.canvas3 = canvas3;
    this.ctx3 = context3;
    this.canvas4 = canvas4;
    this.ctx4 = context4;

    this.rows = 12;
    this.columns = 12;
    this.width = this.canvas1.width;
    this.height = this.canvas1.height;
    this.cellSize = Math.floor(this.width / this.rows);
    this.score = 0;
    this.obstaclesArray = [];
    this.logsArray = [];
    this.maxParticles = 300;
    this.particlesArray = [];
    this.maxRipples = 300;
    this.ripplesArray = [];
    this.gameSpeed = 0.5;
    this.safe = false;
    this.debug = false;
    this.turtleTimer = 0;
    this.keys = {
      arrowUp: {
        pressed: false,
      },
      arrowDown: {
        pressed: false,
      },
      arrowLeft: {
        pressed: false,
      },
      arrowRight: {
        pressed: false,
      },
      frame: false,
    };
    this.collisionImg = document.getElementById("collisionImg");
    this.background = new Background(this);
    this.frogger = new Frogger(this);
    this.sound = new AudioControl();
    this.createObstacles();

    window.addEventListener("keydown", (e) => {
      // console.log(e.key);
      if (e.key === "ArrowUp") {
        this.keys.arrowUp = true;
        this.frogger.frameX = 1;

        this.sound.play(this.sound.frogSound);
      } else if (e.key === "ArrowDown") {
        this.keys.arrowDown = true;
        this.frogger.frameX = 1;
        this.sound.play(this.sound.frogSound);
      } else if (e.key === "ArrowLeft") {
        this.keys.arrowLeft = true;
        this.frogger.frameX = 1;
        this.sound.play(this.sound.frogSound);
      } else if (e.key === "ArrowRight") {
        this.keys.arrowRight = true;
        this.frogger.frameX = 1;
        this.sound.play(this.sound.frogSound);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        this.keys.arrowUp = false;
        this.frogger.frameX = 0;
      } else if (e.key === "ArrowDown") {
        this.keys.arrowUp = false;
        this.frogger.frameX = 0;
      } else if (e.key === "ArrowLeft") {
        this.keys.arrowLeft = false;
        this.frogger.frameX = 0;
      } else if (e.key === "ArrowRight") {
        this.keys.arrowRight = false;
        this.frogger.frameX = 0;
      } else if (e.key.toLowerCase() === "d") {
        this.debug = !this.debug;
        console.log(this.debug);
      }
    });
  }
  update() {
    if (this.keys.arrowUp === true) {
      this.frogger.moveUp();
      this.createParticles();
      this.keys.arrowUp = false;
    } else if (
      this.keys.arrowDown === true &&
      this.frogger.y + this.frogger.height < this.height
    ) {
      this.frogger.moveDown();
      this.createParticles();
      this.keys.arrowDown = false;
    } else if (this.keys.arrowLeft === true && this.frogger.x > 0) {
      this.frogger.moveLeft();
      this.createParticles();
      this.keys.arrowLeft = false;
    } else if (
      this.keys.arrowRight === true &&
      this.frogger.x + this.frogger.width * 2 < this.width
    ) {
      this.frogger.moveRight();
      this.createParticles();
      this.keys.arrowRight = false;
    }

    if (this.frogger.y < 0) {
      this.frogger.scored();
    }
  }

  createGrid() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.ctx4.strokeStyle = "white";
        this.ctx4.strokeRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }
  createObstacles() {
    //layer i car
    for (let i = 0; i < 2; i++) {
      const x = i * 250;
      this.obstaclesArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 9,
          this.cellSize * 2 - 2,
          this.cellSize - 2,
          -0.5,
          "car"
        )
      );
    }

    //layer 2 car
    for (let i = 0; i < 2; i++) {
      const x = i * 250;
      this.obstaclesArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 7,
          this.cellSize * 2 - 2,
          this.cellSize - 2,
          0.7,
          "car"
        )
      );
    }

    //layer 3 car
    for (let i = 0; i < 2; i++) {
      const x = i * 250;
      this.obstaclesArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 5,
          this.cellSize * 2 - 2,
          this.cellSize - 2,
          -0.8,
          "car"
        )
      );
    }

    //layer 4 logs
    for (let i = 0; i < 2; i++) {
      const x = i * 250;
      this.logsArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 4,
          this.cellSize * 2 - 2,
          this.cellSize,
          0.5,
          "log"
        )
      );
    }

    //layer 5 logs
    for (let i = 0; i < 2; i++) {
      const x = i * 250;
      this.logsArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 3,
          this.cellSize * 2 - 2,
          this.cellSize - 2,
          -0.5,
          "log"
        )
      );
    }

    //layer 6 turtle
    for (let i = 0; i < 4; i++) {
      const x = i * 200;
      this.logsArray.push(
        new Obstacle(
          this,
          x,
          this.cellSize * 2,
          this.cellSize - 2,
          this.cellSize - 2,
          0.6,
          "turtle"
        )
      );
    }
  }
  collisions(a, b) {
    return !(
      a.x > b.x + b.width ||
      a.x + a.width < b.x ||
      a.y > b.y + b.height ||
      a.y + a.height < b.y
    );
  }

  handlesObstacles() {
    for (let i = 0; i < this.obstaclesArray.length; i++) {
      this.obstaclesArray[i].draw();
      this.obstaclesArray[i].update();
      if (this.collisions(this.obstaclesArray[i], this.frogger)) {
        this.ctx2.drawImage(
          this.collisionImg,
          0,
          100,
          100,
          100,
          this.frogger.x - this.cellSize * 0.5,
          this.frogger.y - this.cellSize * 0.5,
          this.cellSize * 2,
          this.cellSize * 2
        );
        this.sound.play(this.sound.carHitSound);
        setTimeout(() => {
          this.frogger.reset();
        }, 100);
      }
    }

    for (let i = 0; i < this.logsArray.length; i++) {
      this.logsArray[i].draw();
      this.logsArray[i].update();
    }

    if (this.frogger.y < this.cellSize * 5 && this.frogger.y > this.cellSize) {
      this.safe = false;
      for (let i = 0; i < this.logsArray.length; i++) {
        if (this.collisions(this.frogger, this.logsArray[i])) {
          this.frogger.x += this.logsArray[i].speed * this.gameSpeed;
          this.safe = true;
        }
      }
      if (!this.safe) {
        this.sound.play(this.sound.splashSound);
        this.ctx2.drawImage(
          this.collisionImg,
          0,
          0,
          100,
          100,
          this.frogger.x - this.cellSize * 0.5,
          this.frogger.y - this.cellSize * 0.5,
          this.cellSize * 2,
          this.cellSize * 2
        );
        this.handleRipples();

        setTimeout(() => {
          this.frogger.reset();
        }, 100);
      }
    }
  }
  createParticles() {
    if (this.frogger.y > this.cellSize * 4) {
      for (let i = 0; i < 10; i++) {
        this.particlesArray.unshift(
          new Particle(
            this,
            this.frogger.x + this.frogger.width / 2,
            this.frogger.y + this.frogger.height / 2
          )
        );
      }
    }

    if (this.particlesArray.length > this.maxParticles) {
      for (let i = 0; i < 30; i++) {
        this.particlesArray.pop();
      }
    }
  }
  handleParticles() {
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].draw();
      this.particlesArray[i].update();
    }
    for (let i = 0; i < this.ripplesArray.length; i++) {
      this.ripplesArray[i].drawRipples();
      this.ripplesArray[i].ripplesUpdate();
    }
  }
  handleRipples() {
    if (
      this.frogger.y < this.cellSize * 5 &&
      this.frogger.y > this.cellSize * 1
    ) {
      for (let i = 0; i < 10; i++) {
        this.ripplesArray.unshift(
          new Particle(
            this,
            this.frogger.x + this.frogger.width / 2,
            this.frogger.y + this.frogger.height / 2
          )
        );
      }
    }

    if (this.ripplesArray.length > this.maxRipples) {
      for (let i = 0; i < 30; i++) {
        this.ripplesArray.pop();
      }
    }
  }
  statusText() {
    this.ctx4.fillStyle = "block";
    this.ctx4.font = "50px Arial";
    this.ctx4.fillText(`${this.score}`, this.width / 2, this.cellSize * 1);
    this.ctx4.font = "20px Arial";
    this.ctx4.fillText(
      `Game Speed   ${this.gameSpeed}`,
      this.cellSize * 0.25,
      this.cellSize * 1.5
    );
  }

  render() {
    this.turtleTimer++;
    this.background.draw();

    this.handlesObstacles();
    this.handleParticles();
    this.frogger.draw();
    this.frogger.update();
    this.statusText();

    
  }
}

window.addEventListener("load", () => {
  /**@type{HTMLCanvasElement} */
  const canvas1 = document.getElementById("canvas1");
  const ctx1 = canvas1.getContext("2d");
  canvas1.width = 600;
  canvas1.height = 600;

  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  canvas2.width = canvas1.width;
  canvas2.height = canvas1.height;

  const canvas3 = document.getElementById("canvas3");
  const ctx3 = canvas3.getContext("2d");
  canvas3.width = canvas1.width;
  canvas3.height = canvas1.height;

  const canvas4 = document.getElementById("canvas4");
  const ctx4 = canvas4.getContext("2d");
  canvas4.width = canvas1.width;
  canvas4.height = canvas1.height;

  const game = new Game(
    canvas1,
    ctx1,
    canvas2,
    ctx2,
    canvas3,
    ctx3,
    canvas4,
    ctx4
  );

  function animate() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx4.clearRect(0, 0, canvas1.width, canvas1.height);
    game.render();
    game.update();
    requestAnimationFrame(animate);
  }
  animate();
});
