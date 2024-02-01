//// ATTEMPT to increase rows and cols

let cols = 8;
let rows = 8;
let squareSize;
let margin = 1; // Margin around each rectangle
let cellWidth, cellHeight;
let selections = [];
let startCell = null;
// var palette = ["#3F51B5", "#FFFFFF", "#009688", "#FF5722", "#FF9800"];
var palette = ["#0C6EB7", "#FFC53E", "#859847", "#FB5C5D", "#FFFFFF"];
var lpalette = ["#9acdd9", "#ffde90", "#acbe72", "#ff8889", "#efefef"];
var dpalette = ["#1e5891", "#feac36", "#708332", "#f04546", "#d9d9d9"];

let bg, pbg, gcolor;
let showGrid = true;
let pressed = false;
let dragging = false;
let startX, startY;
let startCol, startRow;

/// RECORD variables
let record = false;
// let isRecording = false; // New flag to control recording status

// let stpRec = false;

var startMillis;
var fps = 60;
var nFramesInLoop = 120;

let drawingFunctions = {
  dF1: dF1,
  dF1a: dF1a,
  dF1b: dF1b,
  dF2: dF2,
  dF2a: dF2a,
  dF3: dF3,
  dF3a: dF3a,
  dF4: dF4,
  dF4a: dF4a,
  dF4b: dF4b,
  // Add more as needed
};

let aRatios = {
  Square: "1:1",
  Portrait: "9:16",
  Landscape: "16:9",
  Custom: "Custom",
};

let currentDrawingFunction = "dF1b";

/// UI variables
let dropdownContainer;
let gClr;
let bgClr;
let gColor;
let sgColor;
let bgColor;
let animCase;
let selector;
let arSelector;
let gridCheckbox;
let rowSlider;
let colSlider;
let logo;
let scl = 4;
let strtRecBttn;
let animateCheckBox;

// function preload(){
//   logo = loadImage("/logo.png")
// }

function setup() {
  // pixelDensity(6);
  createCanvasBasedOnAspectRatio();
  // capturer = new CCapture({ format: "png", framerate: fps });
  strokeCanvas = createGraphics(width, height,SVG);
  tweenerInitialize = false;
  createGUI();
  // noLoop()
}

function changeColor() {
  gClr = gColor.value();
  bgClr = bgColor.value();
}

function draw() {
  // if (record) {
  //   videoRecord();
  // }
  clear();
  background(255);

  if (dragging) {
    let currentCol = floor(mouseX / gridSize);
    let currentRow = floor(mouseY / gridSize);

    let x = min(startCol, currentCol) * gridSize;
    let y = min(startRow, currentRow) * gridSize;
    let width = (abs(startCol - currentCol) + 1) * gridSize;
    let height = (abs(startRow - currentRow) + 1) * gridSize;
    let size = max(width, height);
    stroke(0); // Black outline
    noFill();
    // rect(x, y, width, height);
    rect(x, y, size, size);
  }

  // Draw and update the selections within the draw loop
  for (let i = selections.length - 1; i >= 0; i--) {
    let selection = selections[i];
    rotateSelection(selection);
    updateSelection(selection); // Update the selection
  }

  // strokeCanvas.push();

  // image(strokeCanvas, 0, 0);
  // strokeCanvas.pop();

  if (gridCheckbox.checked()) {
    drawGrid();
  }

  /////// RECORDER
  // capturer.capture(document.getElementById("defaultCanvas0"));
}

let gridSize = 20;

function drawGrid() {
 

  for (let x = 0; x < cnv.width; x += gridSize) {
    for (let y = 0; y < cnv.height; y += gridSize) {
      // let x = i * gridSize;
      // let y = j * gridSize;

      let offset = 0;
      noFill();
      
      ////////// Base Lines
      stroke(0, 20);
      line(x + offset, y, x - offset + gridSize, y);
      line(x, y + offset, x, y - offset + gridSize);
     
      ////////// Bold Lines
      if (arSelector.value() === "Square") {
        push();
        stroke(255, 0, 0, 100);
        noFill();
        line(x * 4, y + offset, x * 4, y - offset + gridSize);
        line(x + offset, y * 4, x + gridSize - offset, y * 4);
        pop();
      } else if (arSelector.value() === "Landscape") {
        push();
        stroke(0, 0, 255, 100);
        noFill();
        line(x * 4, y + offset, x * 4, y - offset + gridSize);
        line(x + offset, y * 4, x + gridSize - offset, y * 4);
        pop();
      } else if (arSelector.value() === "Portrait") {
        push();
        stroke(0, 0, 255, 100);
        noFill();
        line(x * 3, y + offset, x * 3, y - offset + gridSize);
        line(x + offset, y * 3, x + gridSize - offset, y * 3);
        pop();
      } else if (arSelector.value() === "Custom") {
        push();
        stroke(0, 0, 255, 100);
        noFill();
        line(x * 4, y + offset, x * 4, y - offset + gridSize);
        line(x + offset, y * 4, x + gridSize - offset, y * 4);
        pop();
      }
    }
  }
  for (let i = 0; i < selections.length; i++) {
    let selection = selections[i];
    fill(0);
    textSize(8);
    // selection.graphics.textAlign(LEFT,TOP)
    text(selection.orient, selection.x + 5, selection.y + 10);
    // selection.graphics.ellipse(0,0,100,100)
  }
}

function updateSelection(selection) {
  selection.graphics.background(bgColor.value());
  // selection.graphics.clear();

  drawingFunctions[currentDrawingFunction](selection);
}

function rotateSelection(selection) {
  push();
  noStroke();
  imageMode(CENTER);
  translate(selection.width / 2, selection.height / 2);
  image(selection.graphics, selection.x, selection.y);

  pop();
}

function mousePressed() {
    if (mouseX > 0 && mouseY > 0 && mouseX < cnv.width && mouseY < cnv.height) {
        dragging = true;
        startX = mouseX;
        startY = mouseY;
        startCol = floor(mouseX / gridSize);
        startRow = floor(mouseY / gridSize);
        startCell = createVector(startCol, startRow);
        pressed = true;
    }
}

function mouseReleased() {
    if (pressed && mouseX > 0 && mouseY > 0 && mouseX < cnv.width && mouseY < cnv.height) {
        let endCol = floor(mouseX / gridSize);
        let endRow = floor(mouseY / gridSize);
        let endCell = createVector(endCol, endRow);

        let x = min(startCell.x, endCell.x) * gridSize;
        let y = min(startCell.y, endCell.y) * gridSize;
        let width = (abs(startCell.x - endCell.x) + 1) * gridSize;
        let height = (abs(startCell.y - endCell.y) + 1) * gridSize;

        createNewSelection(x, y, max(width, height), max(width, height));
    }
    pressed = false;
    dragging = false;
}

let graphics;

function createNewSelection(x, y, width, height) {
  let offset = 0;
  x = x + offset;
  y = y + offset;
  width = width - 2 * offset;
  height = height - 2 * offset;
  graphics = createGraphics(width, height,SVG);

  // graphics.background(random(gpalette));
  let centerX = (width - 2 * offset) / 2;
  let centerY = (height - 2 * offset) / 2;
  let rWidth = width - 2 * offset;
  let rHeight = height - 2 * offset;

  graphics.noStroke();

  // Remove duplicate selection
  for (let i = selections.length - 1; i >= 0; i--) {
    let existingSelection = selections[i];
    if (
      existingSelection.x === x &&
      existingSelection.y === y &&
      existingSelection.width === width &&
      existingSelection.height === height
    ) {
      selections.splice(i, 1);
    }
  }

  selections.push({
    x: x,
    y: y,
    width: width,
    height: height,
    graphics: graphics,
    orient: 0,
    scaleX: 1,
    scaleY: 1,
  });
}

let orient = 0;
let gif = false;
function keyPressed() {
  if (key === "c" || key === "C") {
    clearSelections();
  } else if (keyCode === BACKSPACE || keyCode === DELETE) {
    undoSelection();
  } else if (key === "G" || key === "g") {
    showGrid = !showGrid;
  } else if (key === "s" || key === "S") {
      save("WeScope_Pattern" + frameCount + ".svg");
    // save
    
//     if (!animateCheckBox.checked()) {
//       save("WeScope_Pattern" + frameCount + ".svg");
//     }
//     if (animateCheckBox.checked()) {
//       // saveGif("Anim" + frameCount, 2); // Adjust the duration to match your loop
//       // saveGif("Anim"+frameCount ,)
//       // if(frameCount % 180 == 0)
//       // {
//       //  saveGif("Anim"+frameCount, 60*3, {delay: 0, units : 'frames'})
//       // }

//       gif = true;
//       exportGif();
//     }

    // save("ForcedAbstract" + frameCount + ".png");
  } else if (key == 1 || key == 2 || key == 3 || key == 4) {
    for (let i = selections.length - 1; i >= 0; i--) {
      let existingSelection = selections[i];
      if (checkInside(existingSelection, mouseX, mouseY)) {
        existingSelection.orient = key;
      }
    }
    orient = key;
  } else if (key === "h") {
    for (let i = selections.length - 1; i >= 0; i--) {
      let existingSelection = selections[i];
      if (checkInside(existingSelection, mouseX, mouseY)) {
        existingSelection.scaleX = -1 * existingSelection.scaleX;
      }
    }
  } else if (key === "v") {
    for (let i = selections.length - 1; i >= 0; i--) {
      let existingSelection = selections[i];
      if (checkInside(existingSelection, mouseX, mouseY)) {
        existingSelection.scaleY = -1 * existingSelection.scaleY;
      }
    }
  }
}

// function exportGif() {
//   if (gif) {
//     {
//       saveGif("Anim" + frameCount, 60 * 3 * 4, { delay: 0, units: "frames" });
//       // saveGif("Anim"+frameCount,)

//       gif = false;
//     }
//   }
// }

function clearSelections() {
  selections = [];
}

function checkInside(selection, x, y) {
  return (
    x > selection.x &&
    x < selection.x + selection.width &&
    y > selection.y &&
    y < selection.y + selection.height
  );
}

function undoSelection() {
  if (selections.length > 0) {
    selections.pop(); // Remove the last graphics element from the stack
  }
}

// function startRecord() {
  
//   capturer = new CCapture({ format: "png", framerate: fps });
//   gridCheckbox.changed(false)
//   capturer.start();
//   startMillis = millis(); // Initialize start time
//   record = true;
//   print("recording started");
//   print("startMillis:"+startMillis)
//   print("millis:"+millis())
//   print("elapsed"+ elapsed) 
  
  
//   redraw()
//   // loop(); // Ensure the draw loop is running
// }

// let dur = 2000 * 4;
// let elapsed = 0;

// function videoRecord() {
//   // capturer.start();
//   if (record) {
//     //     if (frameCount === 1) {
//     //     capturer.start();
//     //   }

//     //   if (startMillis == null) {
//     //     startMillis = millis();
//     //   }

//     // duration in milliseconds
//     // var duration = 2000 * 4;

//     elapsed = millis() - startMillis;
//     // var t = map(elapsed, 0, dur, 0, 1);

//     // if we have passed t=1 then end the animation.
//     if (elapsed > 4 * 2000) {
//       capturer.stop();
//       capturer.save();
//       print("finished recording.");

//       print("startMillis:"+startMillis)
//       print("millis:"+millis())
//       print("elapsed "+ elapsed) 
//       record = false;
//       // elapsed = 0;
      
//       // stpRec = false;
//       return;
//     }
//     capturer.capture(document.getElementById("defaultCanvas0"));
//   }
//       redraw();
  
// }

let aspectRatio = "1:1"; // Default aspect ratio
let cnv;
let svgActive = false;

function createCanvasBasedOnAspectRatio() {
  let canvasWidth, canvasHeight;
  if (aspectRatio === "1:1") {
    canvasWidth = 640; // or any other base size
    canvasHeight = 640;
    gridSize = 20;
  } else if (aspectRatio === "16:9") {
    canvasWidth = 640; // example width for 16:9
    canvasHeight = 360; // example height for 16:9
    gridSize = 20;
  } else if (aspectRatio === "9:16") {
    canvasWidth = 360; // example width for 9:16
    canvasHeight = 640; // example height for 9:16
    gridSize = 20;
  } else if (aspectRatio === "Custom") {
    canvasWidth = 640; // example width for 9:16
    canvasHeight = 640; // example height for 9:16
    gridSize = 20;
  }

  cnv = createCanvas(canvasWidth * 0.5, canvasHeight * 0.5,SVG);
  
}

let newRows = 0;
let newCols = 0;
function updateCanvasSize(aspectRatio) {
  if (aspectRatio === "1:1") {
    canvasWidth = 640; // or any other base size
    canvasHeight = 640;
    gridSize = 20;
  } else if (aspectRatio === "16:9") {
    canvasWidth = 640; // example width for 16:9
    canvasHeight = 360; // example height for 16:9
    gridSize = 20;
  } else if (aspectRatio === "9:16") {
    canvasWidth = 360; // example width for 9:16
    canvasHeight = 640; // example height for 9:16
    gridSize = 20;
  } else if (aspectRatio === "Custom") {
    gridSize = 20;
    canvasWidth = 640 + newRows * 2 * gridSize; // example width for 9:16
    canvasHeight = 640 + newCols * 2 * gridSize; // example height for 9:16
  }

  resizeCanvas(canvasWidth * 0.5, canvasHeight * 0.5,SVG);
  redraw();
}
