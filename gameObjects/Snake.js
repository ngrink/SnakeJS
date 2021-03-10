class Snake {
  constructor() {
    this.headPos = {
      x: Math.floor(c_columns / 2) * cellSize,
      y: Math.floor(c_rows / 2) * cellSize,
    };
    this.direction = { x: 1, y: 0 };
    this.speed = { x: 8, y: 8 };
    this.size = 16;
    this.length = 1;
    this.lengthMultiplier = this.size / this.speed.x;
    this.tail = [];
    this.eatenTail = [];

    this.ctick = 0; // current tick
    this.ticksToUpdate = 2;
    this.changeDirCooldown = false;
    this.changeDirQueue = [];
    this.shiftEatenTiming = 20;
    this.collisionsCount = 0;

    this.color = "#83ff0f";
    this.score = 0;
    this.lostScore = 0;
  }

  move() {
    if (++this.ctick == this.ticksToUpdate) {
      this.tail.push({
        x: this.headPos.x,
        y: this.headPos.y,
      });

      let lenDiff =
        this.tail.length - (this.length - 1) * this.lengthMultiplier;
      if (lenDiff > 0) {
        this.tail.shift();
      }

      this.headPos.x += this.direction.x * this.speed.x;
      this.headPos.y += this.direction.y * this.speed.y;
      this.changeDirCooldown = false;
      this.ctick = 0;
    }
  }

  draw() {
    // eaten tail
    ctxObj.fillStyle = "red";
    for (let i = 0; i < this.eatenTail.length; i++) {
      ctxObj.fillRect(
        this.eatenTail[i].x,
        this.eatenTail[i].y,
        this.size,
        this.size
      );
    }

    // snake
    ctxObj.fillStyle = this.color;
    ctxObj.fillRect(this.headPos.x, this.headPos.y, this.size, this.size);
    for (let i = 0; i < this.tail.length; i++) {
      ctxObj.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }
  }

  checkDir() {
    if (this.headPos.x % 16 == 0 && this.headPos.y % 16 == 0) {
      if (this.changeDirQueue.length != 0) {
        let dir = this.changeDirQueue.shift();
        this.changeDir(dir[0], dir[1]);
      }
    }
  }

  addChangeDirInQueue(x, y) {
    if (this.changeDirQueue.length < 2) {
      this.changeDirQueue.push([x, y]);
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
        this.length += A[i].grow;
        this.score += A[i].score;

        if (A[i].name != "big" || A[i].center) {
          A = A.splice(i, 1);
          apples.newApple();
        } else {
          A = A.splice(i, 1);
        }
      }
    }
  }

  checkSelfCollision() {
    for (let i = 0; i < this.tail.length; i++) {
      if (
        this.headPos.x == this.tail[i].x &&
        this.headPos.y == this.tail[i].y
      ) {
        let lostLen = i + 1;
        let realLostLen = Math.ceil(lostLen / this.lengthMultiplier);
        let ratio = realLostLen / this.length;
        if (ratio > 0.25) ratio = 0.25;
        let penalty = Math.round(this.score * ratio);

        this.eatenTail = this.tail.splice(0, lostLen);
        this.length -= realLostLen;
        this.tail.shift();

        this.score -= penalty;
        this.lostScore += penalty;
        this.collisionsCount += 1;

        setTimeout(this.shiftEaten.bind(this), this.shiftEatenTiming);
      }
    }
  }

  shiftEaten() {
    if (this.eatenTail.length == 0) {
      this.shiftEatenTiming = 15;
      return;
    }
    if (this.shiftEatenTiming > 1) {
      this.shiftEatenTiming -= 0.5;
    }
    this.eatenTail.shift();
    setTimeout(this.shiftEaten.bind(this), this.shiftEatenTiming);
  }
}
