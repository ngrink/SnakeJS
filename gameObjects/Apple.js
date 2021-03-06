class Apples {
  constructor() {
    this.typesOfApple = {
      1: {
        name: "basic",
        value: 1,
        color: "#ff3c36",
        dropChance: 0.8,
      },
      2: {
        name: "medium",
        value: 3,
        color: "#ff6836",
        dropChance: 0.19,
      },
      3: {
        name: "gold",
        value: 10,
        color: "gold",
        dropChance: 0.01,
        duration: 10,
      },
    };
    this.list = [];
  }

  normalizeChances() {
    let len = Object.keys(this.typesOfApple).length;
    this.typesOfApple[len].normalizedChance = this.typesOfApple[len].dropChance;

    for (let i = len - 1; i > 0; i--) {
      this.typesOfApple[i].normalizedChance = parseFloat(
        (
          this.typesOfApple[i].dropChance +
          this.typesOfApple[i + 1].normalizedChance
        ).toFixed(2)
      );
    }
  }

  newApple() {
    let rand = Math.random().toFixed(2);
    let min = null;
    let minValue = Infinity;

    for (let key in this.typesOfApple) {
      let nc = this.typesOfApple[key].normalizedChance;
      if (rand <= nc && nc < minValue) {
        min = key;
        minValue = nc;
      }
    }

    let newapple = {
      x: getRandomInt(0, c_columns) * cellSize,
      y: getRandomInt(0, c_rows) * cellSize,
    };
    Object.assign(newapple, this.typesOfApple[min]);

    if (this.isFree(newapple)) {
      this.list.push(newapple);
    } else {
      this.newApple();
    }
  }

  isFree(apple) {
    // not near borders
    if (
      apple.x == 0 ||
      apple.y == 0 ||
      apple.x == cw - cellSize ||
      apple.y == ch - cellSize
    ) {
      return false;
    }

    // not the same place as another apple
    for (let i = 0; i < this.list.length; i++) {
      if (apple.x == this.list[i].x && apple.y == this.list[i].y) {
        return false;
      }
    }

    // not the same place as snake
    if (apple.x == snake.headPos.x && apple.y == snake.headPos.y) {
      return false;
    }
    for (let i = 0; i < snake.tail.length; i++) {
      if (apple.x == snake.tail[i].x && apple.y == snake.tail[i].y) {
        return false;
      }
    }

    return true;
  }

  drawApples() {
    let A = this.list;
    for (let i = 0; i < A.length; i++) {
      ctxObj.fillStyle = A[i].color;
      ctxObj.fillRect(A[i].x, A[i].y, cellSize, cellSize);
    }
  }
}
