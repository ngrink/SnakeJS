let settings = {
  canvas: {
    width: 1200,
    height: 800,
    cellSize: 16,
    bgColor: "#0b0b0b",
  },
};

settings.canvas.columns = settings.canvas.width / settings.canvas.cellSize;
settings.canvas.rows = settings.canvas.height / settings.canvas.cellSize;
console.log(settings);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Минимум включается, максимум не включается
}
