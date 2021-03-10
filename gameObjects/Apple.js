class Apples {
  constructor() {
    this.typesOfApple = {
      1: {
        name: "basic",
        grow: 1,
        score: 5,
        color: "#ff3c36",
        dropChance: 0.65,
      },
      2: {
        name: "medium",
        grow: 3,
        score: 15,
        color: "#ff6836",
        dropChance: 0.25,
      },
      3: {
        name: "big",
        dropChance: 0.06,
      },
      4: {
        name: "gold",
        grow: 10,
        score: 250,
        color: "gold",
        dropChance: 0.04,
        duration: 5,
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

    let newapple = {};
    Object.assign(newapple, this.typesOfApple[min]);
    if (newapple.name == "big") {
      this.newBigApple();
      return;
    }
    newapple.x = getRandomInt(0, c_columns) * cellSize;
    newapple.y = getRandomInt(0, c_rows) * cellSize;

    if (!this.isPlaceFree(newapple.x, newapple.y)) {
      this.newApple();
      return;
    }
    this.list.push(newapple);
  }

  newBigApple() {
    // center point
    let cx = getRandomInt(0, c_columns) * cellSize;
    let cy = getRandomInt(0, c_rows) * cellSize;
    let coords = this.getCoodsOfArea(cx, cy, 1);

    if (this.isAreaFree(coords)) {
      coords = coords.map((item) => ({
        ...item,
        name: "big",
        grow: 1,
        score: 5,
        color: "#ff3c36",
      }));
      let ind_center = (coords.length - 1) / 2;
      coords[ind_center]["center"] = true;

      this.list = this.list.concat(coords);
    } else {
      this.newBigApple();
      return;
    }
  }

  getCoodsOfArea(x, y, r) {
    let D = 1 + 2 * r; // number of cells by diameter
    let startPointX = x - r * cellSize;
    let startPointY = y - r * cellSize;
    let coords = [];

    for (let row = 0; row < D; row++) {
      for (let col = 0; col < D; col++) {
        coords.push({
          x: startPointX + cellSize * col,
          y: startPointY + cellSize * row,
        });
      }
    }

    return coords;
  }

  isAreaFree(coords) {
    coords.forEach(
      function (item, i, coords) {
        if (!this.isPlaceFree(item.x, item.y)) {
          return false;
        }
      }.bind(this)
    );

    return true;
  }

  isPlaceFree(x, y) {
    // not near borders
    if (x == 0 || y == 0 || x == cw - cellSize || y == ch - cellSize) {
      return false;
    }

    // not the same place as another apple
    for (let i = 0; i < this.list.length; i++) {
      if (x == this.list[i].x && y == this.list[i].y) {
        return false;
      }
    }

    // not the same place as snake
    if (x == snake.headPos.x && y == snake.headPos.y) {
      return false;
    }
    for (let i = 0; i < snake.tail.length; i++) {
      if (x == snake.tail[i].x && y == snake.tail[i].y) {
        return false;
      }
    }

    return true;
  }

  checkDuration() {
    setInterval(function () {
      if (!gameStarted) {
        return;
      }
      let A = apples.list;
      for (let i = 0; i < A.length; i++) {
        if (A[i].hasOwnProperty("duration")) {
          if (A[i].duration == 0) {
            A.splice(i, 1);
            apples.newApple();
          } else {
            A[i].duration -= 1;
          }
        }
      }
    }, 1000);
  }

  drawApples() {
    let A = this.list;
    for (let i = 0; i < A.length; i++) {
      ctxObj.fillStyle = A[i].color;
      ctxObj.fillRect(A[i].x + 1, A[i].y + 1, cellSize - 1, cellSize - 1);
    }
  }
}
