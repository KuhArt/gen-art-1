window.addEventListener('load', () => {
    document
    .getElementsByClassName('refresh-icon')[0]
    .addEventListener('click', () => {
        ALL_CRYSTALS = [];
        for (let x = 0; x < COLUMNS; x++) {
            for (let y = 0; y < ROWS; y++) {
              const posX = CRYSTAL_SIZE / 4 + MARGIN_LEFT + (x * GRIDBOX)
              const posY = CRYSTAL_SIZE / 4 + MARGIN_TOP + (y * GRIDBOX)
              const crystal = makeCrystal({x: posX, y: posY})
              ALL_CRYSTALS.push(crystal)
            }
          }
    })
})
