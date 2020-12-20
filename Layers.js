const state = {
  sides: SIDES,
  stepsOut: 8,
  thinStroke: 9,
  thickStroke: 18
}

const setState = (state) => {
  state.numShapes = state.sides,
  state.angle = 360 / state.numShapes,
  state.singleStep = (CRYSTAL_SIZE / 2) / state.stepsOut,
  state.layerColor = getRandomFromPalette()
  return state
}

const circles = (state) => {
  state.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
  state.position = (CRYSTAL_SIZE / 2) - (state.shapeSize / 2)
  
  return ({
    name: 'circles',
    state,
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(1)
      push()
      //translate(width/2, height/2)
      for (let i = 0; i <= state.numShapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize)
        rotate(state.angle)
      }
      pop()
    }
  })
}

const simpleLines = (state) => {
  state.numSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25)
  state.step = (CRYSTAL_SIZE / 2) / state.numSteps
  state.start = floor(random(0, state.numSteps))
  state.stop = floor(random(state.start, state.numSteps + 1)) 
  state.stop = state.stop < state.numSteps - 2 ? state.stop : Math.max(state.start, state.stop - 2);
  state.weight = state.thickStroke
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
  state.angle = 360 / state.numShapes
  const animationScaleIncrement = 0.5;
  state.animationScale = 0;
  return ({
    name: 'Simple Lines',
    state,
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(state.weight)
      const stepsCount = FRAMES_NUMBER * 10;
      const animationStep = frameCount % stepsCount;
      const quarterTime = stepsCount / 4;

      if (animationStep  <  quarterTime ) {
        state.animationScale = animationScaleIncrement * animationStep;
      } else if  (animationStep  <  3 * quarterTime ){
        state.animationScale = animationScaleIncrement * quarterTime - (animationScaleIncrement * (animationStep - quarterTime ));
      } else {
        state.animationScale = -animationScaleIncrement * quarterTime + animationScaleIncrement * ( animationStep - 3 * quarterTime);
      }

      push()

        //translate(width/2, height/2)
        for (let i = 0; i < state.numShapes; i++) {
          line(state.start * state.step, 0, state.stop * state.step, state.animationScale)  
          rotate(state.angle)
        }
      pop()
    }
  })
}

const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.hexagonTrue = randomSelectTwo()
  state.animationScale = 0;
  const animationScaleIncrement = 0.001;
  return ({
    name: 'Outline Shape', 
    state,
    render: () => {
      const stepsCount = FRAMES_NUMBER * 10;
      const animationStep = frameCount % stepsCount;
      const halfTime = stepsCount / 2;
      let finish = 0;
      if (animationStep  <  halfTime ) {
        state.animationScale = animationScaleIncrement * animationStep;

      } else {
        state.animationScale = animationScaleIncrement * halfTime - (animationScaleIncrement * (animationStep - halfTime ));
      } 
      push()
      
      scale(1 + state.animationScale, 1 + state.animationScale);
      stroke(state.layerColor)
      strokeWeight(state.weight)     
      noFill() 
      push()
      //translate(width/2, height/2)
      if (state.hexagonTrue) {
        hexagon(0, 0, CRYSTAL_SIZE / 2)
      } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      }
      pop()
      pop()
    }
  })
}

const dottedLines = (state) => {                           
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
  state.angle = 360 / state.numShapes
  state.shapeSize = 3
  state.centerOffset = state.singleStep
  const steps = (CRYSTAL_SIZE / 2) /state.singleStep
  return ({
    name: 'Dotted Lines',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
      //translate(width / 2, height / 2)
      for(let i = 0; i <= state.numShapes; i++) {
        
        for(let x = state.centerOffset, num = 0; x < CRYSTAL_SIZE / 2; x += state.singleStep, num++) {
          const ratio = second() % steps === num ? 4 : 1;
          rect(x, 0, state.shapeSize * ratio, state.shapeSize * ratio)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}

const centeredShape = (state) => {                     
  state.randomShape = random(1)
  state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep

  return ({
    name: 'Centered Shape',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
     // translate(width / 2, height / 2)
      if (state.randomShape < 0.1) {
        rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
        ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.6) {
        rotate(state.angle / 2) 
        hexagon(0, 0, state.shapeSize)
      }
      pop()
    }
  })
}

const ringOfShapes = (state) => {                    
  state.steps = floor(random(1, state.stepsOut))
  state.center = state.steps * state.singleStep
  state.randomShape = random(1)
  state.direction = randomSelectTwo() // used for triangle only
  state.fillColor =  state.layerColor;
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.animationAngle = 0;

  if (state.steps < state.stepsOut / 2) {
    state.radius = floor(random(1, state.steps)) * state.singleStep
  } else if (state.steps > state.stepsOut / 2) {
    state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep
  } else {
    state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep
  }

  return ({
    name: 'Ring of Shapes',
    state,
    render: () => {
      state.animationAngle += 0.1;
      state.animationAngle = state.animationAngle >= 360 ? 0 : state.animationAngle;
       push()
      noFill()
      rotate(state.animationAngle)
     // scale(state.animationAngle, state.animationAngle)

      stroke(state.layerColor)
      fill(state.fillColor)
      strokeWeight(state.weight)

      push()
      for (let i = 0; i < state.numShapes; i++) {
        if (state.randomShape < 0.33) {
          ellipse(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
          rect(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.66) {
          myTriangle(state.center, state.radius, state.direction)
        }
        rotate(state.angle)
      }
      pop()
      pop()
    }
  })
}

const steppedHexagons = (state) => {                 
  state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
  state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
  state.singleStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numSteps
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.animationAngle = 0;

  return ({
    name: 'Stepped Hexagons',
    state,
    render: () => {
      state.animationAngle -= 0.1;
      state.animationAngle = state.animationAngle >= 360 ? 0 : state.animationAngle;
      push()
      rotate(state.animationAngle)
      stroke(state.layerColor)
      noFill()
      strokeWeight(state.weight)
      push()
      //translate(width / 2, height / 2)
      rotate(state.angle / 2) 
      for (let i = 1; i < state.numSteps + 1; i++) {
        hexagon(0, 0, state.centerOffset + (i * state.singleStep))
      }
      pop()
      pop()
    }
  })
}









