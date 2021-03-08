// ------------------------------------------------------
// canvas for background
const cnvBg = document.getElementById("c_background");
const ctxBg = cnvBg.getContext("2d");
// ------------------------------------------------------
// canvas overlay
const cnvOv = document.getElementById("c_overlay");
const ctxOv = cnvOv.getContext("2d");
// ------------------------------------------------------
// canvas with game objects
const cnvObj = document.getElementById("c_gameObjects");
const ctxObj = cnvObj.getContext("2d");
// ------------------------------------------------------
// HUD
const HUD = document.getElementById("hud");
const HUD_elems = {};
// ------------------------------------------------------
// settings
let cw = 1200;
let ch = 800;
let cellSize = 16;
let c_columns = cw / cellSize;
let c_rows = ch / cellSize;
let gameStarted = false;
let pause = false;
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
  initHUD();
}

// GAME LOOP
// ----------------------------------------//
function mainLoop() {
  snake.move();
  snake.checkBorders();
  snake.checkEating();
  snake.checkSelfCollision();
  updateHUD();
  clearCanvas();
  drawObjects();

  if (!pause) requestAnimationFrame(mainLoop);
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
    case "p":
      pause = !pause;
      if (pause == false) mainLoop();
      break;
  }
}

function mousePressed(evt) {}

function startGameLoop(evt) {
  if ([37, 38, 39, 40].includes(evt.keyCode)) {
    removeEventListener("keydown", startGameLoop);
    gameStarted = true;
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
  apples.checkDuration();
  apples.newApple();
  apples.newApple();
  apples.newApple();
}

function drawObjects() {
  snake.draw();
  apples.drawApples();
}

function clearCanvas() {
  ctxObj.clearRect(0, 0, cw, ch);
}

function initHUD() {
  HUD_elems.score = hud.getElementsByClassName("score-num")[0];
  HUD_elems.length = hud.getElementsByClassName("length-num")[0];
  HUD_elems.xpos = hud.getElementsByClassName("xpos-num")[0];
  HUD_elems.ypos = hud.getElementsByClassName("ypos-num")[0];
  HUD_elems.collisions = hud.getElementsByClassName("collisions-num")[0];
  // init values
  updateHUD();
}

function updateHUD() {
  HUD_elems.score.textContent = snake.score;
  HUD_elems.length.textContent = snake.length;
  HUD_elems.xpos.textContent = snake.headPos.x;
  HUD_elems.ypos.textContent = snake.headPos.y;
  HUD_elems.collisions.textContent = snake.collisionsCount;
}
