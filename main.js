// ------------------------------------------------------
// canvas for background
let cnvBg = document.getElementById("c_background");
let ctxBg = cnvBg.getContext("2d");
// ------------------------------------------------------
// canvas with game objects
let cnvObj = document.getElementById("c_gameObjects");
let ctxObj = cnvObj.getContext("2d");
// ------------------------------------------------------
// settings
let cw = 1200;
let ch = 800;
let cellSize = 16;
let c_columns = cw / cellSize;
let c_rows = ch / cellSize;
// ------------------------------------------------------
// global objects
let snake;
let apples;

addEventListener("load", function () {
  init();
  addEventListener("keydown", startGameLoop);
  addEventListener("keydown", keyPressed); // keyboard press handler
  addEventListener("mousedown", mousePressed); // mouse press handler
});

// INITIALIZATION
// ----------------------------------------//
function init() {
  drawGrid();
  drawMap();
  createObjects();
  drawObjects();
}

// GAME LOOP
// ----------------------------------------//
function mainLoop() {
  snake.move();
  snake.checkBorders();
  snake.checkEating();
  snake.checkSelfCollision();
  snake.draw();
  apples.drawApples();
  requestAnimationFrame(mainLoop);
}

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
    case "g":
      snake.length += 10;
      break;
  }
}

function mousePressed(evt) {}

function startGameLoop(evt) {
  if ([37, 38, 39, 40].includes(evt.keyCode)) {
    removeEventListener("keydown", startGameLoop);
    mainLoop();
  }
}

function drawGrid() {
  ctxBg.strokeStyle = "#000";
  for (let i = 0; i < c_rows; i++) {
    for (let j = 0; j < c_columns; j++) {
      ctxBg.strokeRect(cellSize * j, cellSize * i, cellSize, cellSize);
    }
  }
}

function drawMap() {}

function createObjects() {
  snake = new Snake();
  apples = new Apples();
  apples.normalizeChances();
  apples.newApple();
  apples.newApple();
  apples.newApple();
}

function drawObjects() {
  snake.draw();
  apples.drawApples();
}
