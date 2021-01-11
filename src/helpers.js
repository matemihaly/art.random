const hexagon = (posX, posY, radius) => {
  const rotAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
    vertex(thisVertex.x, thisVertex.y);
  }
  endShape(CLOSE);
};

const triangles = (center, radius, direction) => {
  if (direction) {
    beginShape();
    vertex(center + radius * cos(0), radius * sin(0));
    vertex(center + radius * cos(120), radius * sin(120));
    vertex(center + radius * cos(240), radius * sin(240));
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(center + radius * cos(180), radius * sin(180));
    vertex(center + radius * cos(300), radius * sin(300));
    vertex(center + radius * cos(60), radius * sin(60));
    endShape(CLOSE);
  }
};

const pointOnCircle = (posX, posY, radius, angle) => {
  const x = posX + radius * cos(angle);
  const y = posY + radius * sin(angle);
  return createVector(x, y);
};

const selectRandomlyTwo = () => {
  const randomNum = random(1);
  return randomNum > 0.5 ? true : false;
};

const getRandomColorFromPalette = () => {
  const randomNum2 = floor(random(0, PALETTE.length));
  return PALETTE[randomNum2];
};

// Troubleshoot
const testLines = (state) => {
  state.numShapes = selectRandomlyTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numShapes;

  return {
    name: "Test Lines",
    state,
    render: () => {
      stroke(state.layerColor);
      noFill();
      strokeWeight(state.thickStroke);
      push();
      if (state.lines) {
        for (let i = 0; i < 360 - 0.1; i += state.angle) {
          line(0, 0, 0, CRYSTAL_SIZE / 2);
          rotate(state.angle);
        }
      }
      if (state.circles) {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
      }
      pop();
    },
  };
};

const layerConstructors = [
  {
    name: "Outline Shape",
    init: (props) => outlineShape({ ...props, ...setState(state) }),
    weight: 0.4,
  },
  {
    name: "Centered Shape",
    init: (props) => centeredShape({ ...props, ...setState(state) }),
    weight: 0.3,
  },
  {
    name: "Circles",
    init: (props) => circles({ ...props, ...setState(state) }),
    weight: 0.3,
  },
  {
    name: "Simple Lines",
    init: (props) => simpleLines({ ...props, ...setState(state) }),
    weight: 0.3,
  },
  {
    name: "Dotted Lines",
    init: (props) => dottedLines({ ...props, ...setState(state) }),
    weight: 0.3,
  },
  {
    name: "Ring of Shapes",
    init: (props) => spreadedShapes({ ...props, ...setState(state) }),
    weight: 0.2,
  },
  {
    name: "Stepped Hexagons",
    init: (props) => steppedHexagons({ ...props, ...setState(state) }),
    weight: 0.7,
  },
  {
    name: "Test Lines",
    init: (props) =>
      testLines({ lines: false, circles: false, ...props, ...setState(state) }),
    weight: 1,
  },
];

const makeCrystal = (pos) => {
  const layers = layerConstructors.map((layerConstructor) => {
    let picker = random(1);
    const draw = picker > layerConstructor.weight;
    // const draw = layerConstructor.name === "Test Lines";
    return layerConstructor.init({
      pos,
      draw,
    });
  });
  return layers;
};

const drawCrystal = (crystal) => {
  crystal.forEach((layer) => {
    if (layer.state.draw) {
      push();
      translate(layer.state.pos.x, layer.state.pos.y);
      layer.render();
      pop();
    }
  });
};
