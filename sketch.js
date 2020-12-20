const WIDTH = window.innerWidth * 0.7;
const HEIGHT = window.innerHeight
const CRYSTAL_SIZE = Math.max(WIDTH, HEIGHT)/ 3.5
const SIDES = 6

// layout
const COLUMNS = 2
const ROWS = 2
const MARGIN_LEFT = (WIDTH - CRYSTAL_SIZE * COLUMNS) / 2
const MARGIN_TOP = (HEIGHT - CRYSTAL_SIZE * ROWS) / 2
const PADDING = CRYSTAL_SIZE * 0.3
const GRIDBOX = CRYSTAL_SIZE + PADDING
const START = (CRYSTAL_SIZE / 2) + MARGIN_LEFT
const FRAMES_NUMBER = 30;

let PALETTE = []
ALL_CRYSTALS = []
const dpr = window.devicePixelRatio;
function setup() {
  frameRate(FRAMES_NUMBER)
  const totalX = WIDTH * dpr;
  const totalY = HEIGHT * dpr;
  createCanvas(WIDTH, HEIGHT)

  PALETTE = [
   '#4DCCBD', 
   '#231651',
   '#2374AB',
   '#FF8484'
  ]

  angleMode(DEGREES)
  rectMode(CENTER)

  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = CRYSTAL_SIZE / 4 + MARGIN_LEFT + (x * GRIDBOX)
      const posY = CRYSTAL_SIZE / 4 + MARGIN_TOP + (y * GRIDBOX)
      const crystal = makeCrystal({x: posX, y: posY})
      ALL_CRYSTALS.push(crystal)
    }
  }
}

function draw() {
  background('#D6FFF6');
  push()
  // if (window.innerWidth > window.innerHeight) {
  //   translate(WIDTH / 2 - CRYSTAL_SIZE / 2 , HEIGHT / 2 - CRYSTAL_SIZE / 2 )
  // } else {
  //   translate(WIDTH / 2 - CRYSTAL_SIZE / 2, HEIGHT / 2 - CRYSTAL_SIZE / 2) 
  // }
  ALL_CRYSTALS.forEach(crystal => {
    drawCrystal(crystal)
  })
  pop()
}












