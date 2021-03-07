class Snake {
  constructor() {
    this.headPos = {
      x: Math.floor(c_columns / 2) * cellSize,
      y: Math.floor(c_rows / 2) * cellSize,
    };
    this.direction = { x: 1, y: 0 };
    this.speed = { x: 16, y: 16 };
    this.size = 16;
    this.length = 1;
    this.tail = [];
    this.eatenTail = [];
    this.peak = null;

    this.ctick = 0; // current tick
    this.ticksToUpdate = 3;
    this.changeDirCooldown = false;

    this.color = "#83ff0f";
    this.score = 0;
  }

  move() {
    this.ctick++;
    if (this.ctick == this.ticksToUpdate) {
      this.tail.push({ x: this.headPos.x, y: this.headPos.y });

      let lenDiff = this.tail.length - (this.length - 1);
      if (lenDiff > 0) {
        this.peak = this.tail.shift();
      }

      this.headPos.x += this.direction.x * this.speed.x;
      this.headPos.y += this.direction.y * this.speed.y;
      this.ctick = 0;
      this.changeDirCooldown = false;
    }
  }

  draw() {
    if (this.peak) {
      ctxObj.clearRect(this.peak.x, this.peak.y, cellSize, cellSize);
      this.peak = null;
    }

    ctxObj.fillStyle = this.color;
    ctxObj.fillRect(this.headPos.x, this.headPos.y, this.size, this.size);

    for (let i = 0; i < this.tail.length; i++) {
      ctxObj.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }
  }

  changeDir(x, y) {
    if (this.changeDirCooldown) return;
    if (this.direction.x != x && this.direction.y != y) {
      this.direction.x = x;
      this.direction.y = y;
      this.changeDirCooldown = true;
    }
  }

  checkBorders() {
    if (this.headPos.x < 0) {
      this.headPos.x = cw - this.size;
    } else if (this.headPos.x >= cw) {
      this.headPos.x = 0;
    } else if (this.headPos.y < 0) {
      this.headPos.y = ch - this.size;
    } else if (this.headPos.y >= ch) {
      this.headPos.y = 0;
    }
  }

  checkEating() {
    let A = apples.list;
    for (let i = 0; i < A.length; i++) {
      if (A[i].x == this.headPos.x && A[i].y == this.headPos.y) {
        this.length += 1;
        this.score += A[i].value;

        A = A.splice(i, 1);
        apples.newApple();
      }
    }
  }

  checkSelfCollision() {}
}
