const CRYSTAL_SIZE = 150;
const SIDES = 6;
let PALETTE = [];
CRYSTALS = [];

// Layout
const MARGIN = CRYSTAL_SIZE / 2;
const COLUMNS = 5;
const ROWS = 3;
const PADDING = CRYSTAL_SIZE * 0.2;
const GRID_BOX = CRYSTAL_SIZE + PADDING;
const START = CRYSTAL_SIZE / 2 + MARGIN;

function setup() {
  const totalX = START + GRID_BOX * COLUMNS;
  const totalY = START + GRID_BOX * ROWS;
  createCanvas(totalX, totalY, SVG);

  PALETTE = [
    color(255, 48, 60),
    color(102, 243, 155),
    color(166, 228, 255),
    color(192, 179, 255),
    color(255, 237, 99),
  ];

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const posX = START + i * GRID_BOX;
      const posY = START + j * GRID_BOX;
      const crystal = makeCrystal({ x: posX, y: posY });
      CRYSTALS.push(crystal);
    }
  }

  CRYSTALS.forEach((crystal) => drawCrystal(crystal));
}
