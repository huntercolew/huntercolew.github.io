//This script was built using P5.play library
 
var walking;
var standing;
var characters = [];
var i;

function preload() {
  walkingSpelunk = loadAnimation(loadSpriteSheet('spritesheet.png', 80, 80, 9));
  standingSpelunk = loadAnimation(loadSpriteSheet('spritesheet.png', 80, 80, 1));
  walkingClassic = loadAnimation(loadSpriteSheet('classicsheet.png', 126, 139, 9));
  standingClassic = loadAnimation(loadSpriteSheet('classicsheet.png', 126, 139, 1));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Loop to create a few identical characters
  for(i = 0; i < 5; i++)
    characters[i] = new Character("Spelunky" + i, random(windowWidth*0.1, windowWidth*0.9), random(windowHeight*0.1, windowHeight*0.9), walkingSpelunk, standingSpelunk);
  // for(i = characters.length; i < 10; i++){
  //   characters[i] = new Character("Classic" + i, random(windowWidth*0.1, windowWidth*0.9), random(windowHeight*0.2, windowHeight*0.9), walkingClassic, standingClassic);
  // }
    
}

function draw() {
  clear();
  background(230);
  for(i = 0; i < characters.length; i++){
    drawSprite(characters[i].sprite);
  }
}

function keyPressed() {
  for(i = 0; i < characters.length; i++){
    characters[i].keyPressed();
  }
}

function keyReleased() {
  for(i = 0; i < characters.length; i++){
    characters[i].keyReleased();
  }
}

function mousePressed() {
  for(i = 0; i < characters.length; i++){
    characters[i].mousePressed();
  }
}


class Character {
  constructor(name, dx, dy, walkAnim, standAnim) {

    this.name = name;
    this.dx = dx;
    this.dy = dy;
    this.walkAnim = walkAnim;
    this.standAnim = standAnim;
    this.touchLeft = false;
    this.touchRight = false;

    //Algorithm to inversely match speed of sprite with animation delay
    this.speed = 2 + Math.floor(Math.random() * 4);
    this.framerate = 7 - this.speed;
    this.walkAnim.frameDelay = this.framerate;

    //Sprite object within character
    this.sprite = createSprite(this.dx, this.dy, 30, 30);
    this.sprite.addAnimation('stand', this.standAnim);
    this.sprite.addAnimation('walk', this.walkAnim);
    this.sprite.changeAnimation('stand');

  }

  draw() {
    drawSprite(this.sprite);
  }

  mousePressed() {
    if(Math.abs(this.sprite.position["x"] - mouseX) <= 20 && Math.abs(this.sprite.position["y"] - mouseY) <= 20) {
          console.log("X:" + mouseX + " Y:" + mouseY);
          console.log(this.sprite.position);
          this.sprite.position['x'] += 5;
    }
    //console.log(Math.abs(this.sprite.position["y"] - mouseY));
  }

  keyPressed() {
    push();
    if(keyIsDown(RIGHT_ARROW)){
      this.sprite.mirrorX(1);
      this.sprite.changeAnimation('walk');
      this.sprite.setSpeed(this.speed, 0);
    } else if (keyIsDown(LEFT_ARROW)) {
      this.sprite.mirrorX(-1);
      this.sprite.changeAnimation('walk');
      this.sprite.setSpeed(this.speed, 180);
    }
    pop();
  }

  keyReleased() {
    push();
    this.sprite.setSpeed(0, 0);
    this.sprite.changeAnimation('stand');
    pop();
  }
}
