//setup varibles

//Rendering window/image (will be scaled up onto the main canvas so it doesn't look like a small box and i dont have to do any weird math with my positions and scaling)
let page;

//background settings
let bgSpeed=0.2
let bgColor1="#000000"
let bgColor2="#FFDD00"
//where the card is on the screen
let boxY=470
let randomChars=["-","_","=","|","\\","/"]
//the Y position of the "click anywhere to start" text
let startTextY=180

//check for if the card should be up
let boxUP=false
//Currently shown reason
let currentFact=0

//list of reasons
let facts=["","",""]

//Where the current fact is on the screen
let factTextX=320

//load reasons because i dont trust ayaan to touch my code
function preload() {
  reasonDat = loadStrings('https://raw.githubusercontent.com/bestbinaryboi/beesAreHorrible/refs/heads/main/reasons.txt');
}

//setup canvases
function setup() {
  page=createGraphics(640,360);
  createCanvas(windowWidth,windowHeight)
  page.pixelDensity(3)
  facts=reasonDat
}



function mouseClicked() {
  //bring the card up
  if(boxUP){
    currentFact+=1
    factTextX=-50
  }
  boxUP=true
  
  //when the card is up allow the user to cycle reasons

}

//target for box is 200

//main draw loop obviously
function draw() {
  background(bgColor1);
  page.clear()
  page.push()
  page.fill(0,0,0,100,)
  page.rect(0,0,640,360,10)
  page.pop()
  //draw background animation
  push()
  stroke(bgColor2)
  strokeWeight(10)
  for (let i=0;i<width/15;i++) {
    line((frameCount%30)+(i*30),0,0,(frameCount%30)+(i*30))
  }
  pop()
  

  
  //draw "click to start" text
  page.push()
  page.textAlign(CENTER)
  page.stroke(1)
  page.fill(255)
  page.textSize(17)
  page.text("Click anywhere to start!",320,startTextY)
  page.pop()
  
  //draw the card that comes up
  page.push()
  page.stroke(1)
  page.fill("#FFC107")
  page.rectMode(CENTER)
  page.rect(320,boxY,620,250,20)
  page.pop()
  
  //Draw Title
  page.push()
  page.textAlign(CENTER)
  page.fill(0,255,0)
  page.textSize(20+cos(frameCount/100)*2)
  page.strokeWeight(2)
  page.stroke(0,0,255)
  page.translate(page.width/2,50)
  page.rotate(cos(frameCount/90)/5)
  page.text("HOW BEES CONTROL US",0,0)
  page.pop()
  
  //text at the bottom of the card
  page.push()
  page.textAlign(CENTER)
  page.stroke(1)
  page.fill(255)
  page.textSize(15)
  page.text("Click for next injustice",320,boxY+100)
  page.pop()
  
  //draw the reason
  page.push()
  page.textAlign(CENTER)
  page.stroke(1)
  page.fill(255)
  page.textSize(18)
  let renderFact=((currentFact%facts.length)+1)+".\n"+facts[currentFact%(facts.length)]
  for (let i=0;i<renderFact.length;i++){
    if(renderFact[i]="%"){
      renderFact[i]=random(randomChars)
    }
  }
  page.text(renderFact,factTextX,boxY-20)
  page.pop()
  
  //move the box if it needs to be moved
  if (boxUP){
      boxY=lerp(boxY,200,0.1)
      startTextY=lerp(startTextY,-5,0.1)
  }
  
  //move the fact text to the center at all times
  factTextX=lerp(factTextX,320,0.1)
  
  //render the page onto the main canvas
  pasteGraphic(page)
}

//code I made forever ago for screen-filling apps
function pasteGraphic(graphic) {
  // Get the aspect ratios of the screen and the graphic
  const screenAspect = width / height;
  const graphicAspect = graphic.width / graphic.height;

  let newWidth, newHeight;

  // If the graphic is wider than the screen (or has the same aspect ratio)
  if (graphicAspect > screenAspect) {
    // Scale based on width
    newWidth = width;
    newHeight = width / graphicAspect;
  } else {
    // Scale based on height
    newWidth = height * graphicAspect;
    newHeight = height;
  }

  // Draw the graphic onto the main canvas, centered
  image(graphic, (width - newWidth) / 2, (height - newHeight) / 2, newWidth, newHeight);
}
