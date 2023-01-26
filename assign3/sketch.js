
var spriteSheet;
var walking;
var minerObj;

function preload() {
  spriteSheet = loadSpriteSheet('spritesheet.png', 80, 80, 144)
  splunk = loadAnimation(spriteSheet[0],
    spriteSheet[1],
    spriteSheet[2],
    spriteSheet[3],
    spriteSheet[4],
    spriteSheet[5],
    spriteSheet[6],
    );
}


function setup() {
  createCanvas(1200, 900);
  background(0);
}



function draw() {
  clear();
  drawSprites();
}

function mousePressed() {
  var s = createSprite(mouseX, mouseY, 30, 30);
  s.addAnimation('splunk', splunk)

}