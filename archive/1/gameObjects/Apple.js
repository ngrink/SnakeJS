apples = {
  size: 16,
  list: [],
};

apples.newApple = function () {
  apples.list.push({
    x: getRandomInt(0, settings.canvas.columns) * apples.size,
    y: getRandomInt(0, settings.canvas.rows) * apples.size,
    value: 1,
    color: "#ff6836",
  });
};

apples.drawApples = function () {
  let A = apples.list;
  for (let i = 0; i < A.length; i++) {
    ctx.fillStyle = A[i].color;
    ctx.fillRect(A[i].x, A[i].y, apples.size, apples.size);
  }
};
