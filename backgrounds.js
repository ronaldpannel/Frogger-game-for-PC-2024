class Background {
  constructor(game) {
    this.game = game;

    this.roadBg = document.getElementById("roadBg");
    this.grassBg = document.getElementById("grassBg");
  }
  draw() {
    this.game.ctx2.drawImage(
      this.roadBg,
      0,
      0,
      this.game.width,
      this.game.height
    );
    this.game.ctx4.drawImage(
      this.grassBg,
      0,
      0,
      this.game.width,
      this.game.height
    );
  }
}
