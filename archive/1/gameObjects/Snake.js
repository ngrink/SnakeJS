class Snake {
  constructor() {
    this.headPos = {
      x: Math.floor(settings.canvas.columns / 2) * settings.canvas.cellSize,
      y: Math.floor(settings.canvas.rows / 2) * settings.canvas.cellSize,
    };
    this.direction = { x: 1, y: 0 };
    this.baseSpeed = this.speed = { x: 16, y: 16 };
    this.size = 16;
    this.length = 1;
    this.tail = [];
    this.tick = 0;
    this.tickrate = 3;
    // ---------- //
    this.color = "#83ff0f";
    this.score = 0;
  }

  move() {
    this.tick++;

    if (this.tick % this.tickrate == 0) {
      this.grow();
      this.tail.shift();

      this.headPos.x += this.direction.x * this.speed.x;
      this.headPos.y += this.direction.y * this.speed.y;
      this.tick = 0;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.headPos.x, this.headPos.y, this.size, this.size);

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }
  }

  changeDir(x, y) {
    if (this.direction.x != x && this.direction.y != y) {
      this.direction.x = x;
      this.direction.y = y;
    }
  }

  grow() {
    this.tail.push({
      x: this.headPos.x,
      y: this.headPos.y,
    });
  }

  checkCoords() {
    // check borders (teleporting)
    if (this.headPos.x < 0) {
      this.headPos.x = canv.width - this.size;
    } else if (this.headPos.x > canv.width) {
      this.headPos.x = 0;
    } else if (this.headPos.y < 0) {
      this.headPos.y = canv.height - this.size;
    } else if (this.headPos.y > canv.height) {
      this.headPos.y = 0;
    }

    // check eating
    let A = apples.list;
    for (let i = 0; i < A.length; i++) {
      if (A[i].x == this.headPos.x && A[i].y == this.headPos.y) {
        this.length += 1;
        this.grow();
        this.score += A[i].value;

        A = A.splice(i, 1);
        apples.newApple();
      }
    }
  }

  checkSelfCollision() {}
}
