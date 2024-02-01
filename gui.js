let canva 
// let logoDiv


function createGUI() {
  
  canva = createDiv();
  canva.id("canvaDiv")
  
  
  dropdownContainer = createDiv();
  dropdownContainer.id("dropdown-container");
  dropdownContainer.position(0, 0);
  
  ///////// Logo
 
  // logoDiv = createDiv('');
  // logoDiv.id('logo');
  
  // let logoImg = createImg('/logo.png');
  // logoImg.parent(logoDiv);
  
  ///////// A ratios
  arSelector = createSelect();
  
    for (let key in aRatios) {
    arSelector.option(key);
  }
  arSelector.changed(() => {
    aspectRatio = aRatios[arSelector.value()];
    // tweenerInitialized = false
    updateCanvasSize(aspectRatio);
    // redraw()
  });
  
  ///////// Rows Slider
  rowSlider = createSlider(-8,8,0,1);
  rowSlider.changed(() =>{
  newRows = rowSlider.value()
  updateCanvasSize(aspectRatio)
    
  })
  
   ///////// Rows Slider
  colSlider = createSlider(-8,8,0,1);
  colSlider.changed(() =>{
  newCols = colSlider.value()
  updateCanvasSize(aspectRatio)
    
  })
  
  ///////// Graphic Color
  gColor = createSelect();
  // gColor.position(width+20, 40);
  gColor.option("Red", palette[3]);
  gColor.option("Yellow", palette[1]);
  gColor.option("Blue", palette[0]);
  gColor.option("White", palette[4]);
  gColor.option("Green", palette[2]);

  // gColor.id('mySelect');

  gColor.option("L Red", lpalette[3]);
  gColor.option("L Yellow", lpalette[1]);
  gColor.option("L Blue", lpalette[0]);
  gColor.option("L White", lpalette[4]);
  gColor.option("L Green", lpalette[2]);

  gColor.option("D Red", dpalette[3]);
  gColor.option("D Yellow", dpalette[1]);
  gColor.option("D Blue", dpalette[0]);
  gColor.option("D White", dpalette[4]);
  gColor.option("D Green", dpalette[2]);

  ///////// Background Color
  bgColor = createSelect();
  // bgColor.position(width+20, 10);
  bgColor.option("White", palette[4]);
  bgColor.option("Red", palette[3]);
  bgColor.option("Yellow", palette[1]);
  bgColor.option("Blue", palette[0]);
  bgColor.option("Green", palette[2]);

  bgColor.option("L White", lpalette[4]);
  bgColor.option("L Red", lpalette[3]);
  bgColor.option("L Yellow", lpalette[1]);
  bgColor.option("L Blue", lpalette[0]);
  bgColor.option("L Green", lpalette[2]);

  bgColor.option("D White", dpalette[4]);
  bgColor.option("D Red", dpalette[3]);
  bgColor.option("D Yellow", dpalette[1]);
  bgColor.option("D Blue", dpalette[0]);
  bgColor.option("D Green", dpalette[2]);

  ///////// Grids
  gridCheckbox = createCheckbox("Grid", true);
  
  /////// Animate (DEPrec) 
  // animateCheckBox = createCheckbox("Animate", true);
  // animateCheckBox.changed(() => {
  //   animate = animateCheckBox.checked()
  // });
  
  
  ///////// Drawing Functions
  selector = createSelect();

  for (let key in drawingFunctions) {
    selector.option(key);
  }
  selector.changed(() => {
    currentDrawingFunction = selector.value();
    // tweenerInitialized = false
  });



  ///////// Secondary Graphic COlor

  sgColor = createSelect();
  // sgColor.position(width+20, 60);
  sgColor.option("Red", palette[3]);
  sgColor.option("Yellow", palette[1]);
  sgColor.option("Blue", palette[0]);
  sgColor.option("White", palette[4]);
  sgColor.option("Green", palette[2]);

  sgColor.option("L Red", lpalette[3]);
  sgColor.option("L Yellow", lpalette[1]);
  sgColor.option("L Blue", lpalette[0]);
  sgColor.option("L White", lpalette[4]);
  sgColor.option("L Green", lpalette[2]);

  sgColor.option("D Red", dpalette[3]);
  sgColor.option("D Yellow", dpalette[1]);
  sgColor.option("D Blue", dpalette[0]);
  sgColor.option("D White", dpalette[4]);
  sgColor.option("D Green", dpalette[2]);

  ///////// Start Recording
  saveSVG = createButton("save SVG");
  // button.position(width+20, 200);
  // strtRecBttn.mousePressed(startRecord);
  // button.mousePressed(print("Yes"))
  saveSVG.mousePressed(() => {
  gridCheckbox.checked(false)
    redraw()
     save("WeScope_Pattern" + frameCount + ".svg");
    
  // createCheckbox
    // startRecord();
  });
  


  let instruction = createP(
    'Press "h" to Flip horizontally <br> Press "v" to Flip Vertically <br> Press "1,2,3,4" to Rotate'
  );

  cnv.parent(canva)
  // logoDiv.parent(dropdownContainer);
  arSelector.parent(dropdownContainer);
  rowSlider.parent(dropdownContainer)
  colSlider.parent(dropdownContainer)  
  
  bgColor.parent(dropdownContainer);
  gColor.parent(dropdownContainer);
  sgColor.parent(dropdownContainer);
  gridCheckbox.parent(dropdownContainer);
  // animateCheckBox.parent(dropdownContainer);

  selector.parent(dropdownContainer);
  saveSVG.parent(dropdownContainer);
  instruction.parent(dropdownContainer);
}
