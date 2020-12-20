const CRYSTAL_SIZE = Math.max(window.innerWidth, window.innerHeight)/ 3
const SIDES = 6

// layout
const MARGIN = 10
const COLUMNS = 1
const ROWS = 1
const PADDING = CRYSTAL_SIZE * 0.2
const GRIDBOX = CRYSTAL_SIZE + PADDING
const START = (CRYSTAL_SIZE / 2) + MARGIN
const FRAMES_NUMBER = 30;

let PALETTE = []
ALL_CRYSTALS = []
const dpr = window.devicePixelRatio;
function setup() {
  frameRate(FRAMES_NUMBER)
  const totalX = (START + GRIDBOX * COLUMNS) * dpr;
  const totalY = (START + GRIDBOX * ROWS) * dpr;
  createCanvas(window.innerWidth, window.innerHeight)

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
      const posX = START + (x * GRIDBOX)
      const posY = START + (y * GRIDBOX)
      const crystal = makeCrystal({x: posX, y: posY})
      ALL_CRYSTALS.push(crystal)
    }
  }
}

function draw() {
  background('#D6FFF6');
  push()
  if (window.innerWidth > window.innerHeight) {
    translate(window.innerHeight / 2 - CRYSTAL_SIZE / 2 , window.innerHeight / 2 - CRYSTAL_SIZE / 2 )
  } else {
    translate(window.innerWidth / 2 - CRYSTAL_SIZE / 2, window.innerHeight / 2 - CRYSTAL_SIZE / 2) 
  }
  ALL_CRYSTALS.forEach(crystal => {
    drawCrystal(crystal)
  })
  pop()
}












