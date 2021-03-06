let canv = document.getElementById("js-canvas");
let ctx = canv.getContext("2d");
let snake;

addEventListener("load", function () {
  init();
  addEventListener("keydown", startGameLoop);
  addEventListener("keydown", keyPressed); // keyboard press handler
});

function init() {
  canv.width = settings.canvas.width;
  canv.height = settings.canvas.height;
  canv.style.backgroundColor = settings.canvas.bgColor;
  drawGrid();

  snake = new Snake();
  snake.draw();
  console.log(snake);

  apples.newApple();
  apples.drawApples();
}

function startGameLoop(evt) {
  if ([37, 38, 39, 40].includes(evt.keyCode)) {
    setInterval(gameLoop, 1000 / 60); // 60 FPS
    removeEventListener("keydown", startGameLoop);
  }
}

// GAME LOOP
// --------------------------------------------//
function gameLoop() {
  clearCanvas();
  drawGrid();
  snake.draw();
  snake.move();
  snake.checkCoords();
  apples.drawApples();
}
// --------------------------------------------//

function keyPressed(evt) {
  switch (evt.key) {
    case "ArrowUp":
      snake.changeDir(0, -1);
      break;
    case "ArrowDown":
      snake.changeDir(0, 1);
      break;
    case "ArrowLeft":
      snake.changeDir(-1, 0);
      break;
    case "ArrowRight":
      snake.changeDir(1, 0);
      break;
  }
}

function clearCanvas() {
  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, canv.width, canv.height);
}

function drawGrid() {
  ctx.strokeStyle = "#000";
  for (let i = 0; i < settings.canvas.rows; i++) {
    for (let j = 0; j < settings.canvas.columns; j++) {
      ctx.strokeRect(
        settings.canvas.cellSize * j,
        settings.canvas.cellSize * i,
        settings.canvas.cellSize,
        settings.canvas.cellSize
      );
    }
  }
}
