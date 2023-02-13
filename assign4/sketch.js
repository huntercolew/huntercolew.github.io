//This script was built using P5.play library
 
var walking;
var standing;
var characters = [];
var i;
let myWidth = 600
let myHeight = 500;

let game = {
  time: 30,
  elapsed: 0,
  score: 0,
  maxScore: 0,
  totalSprites: 10,
  remaining: 10,
  state: "start",
  reset: function () {
    // function to reset score, killed bugs, and game properties such as speed and score.
    for(i = 0; i < characters.length; i++){
      characters[i].killed = false;
      characters[i].sprite.changeAnimation("walk");
      characters[i].speed = characters[i].speed - this.score;
      characters = characters.slice(0, 10);
    }
    this.elapsed = 0;
    this.score = 0;
    remaining = 10;
  },
  increaseSpeed: function () {
    // function to increment speed of bugs as they are squished
    for(i = 0; i < characters.length; i++){
      characters[i].speed += 1
    }
  }
}



function preload() {
  walking = loadAnimation(loadSpriteSheet('bug.png', 80, 80, 4));
  standing = loadAnimation(loadSpriteSheet('bug2.png', 80, 80, 1));
}

function setup() {
  createCanvas(myWidth, myHeight);
  //Loop to create a 10 bugs, equally distributed in vertical and horizontal
  for(i = 0; i < game.totalSprites/2; i++)
    characters[i] = new Character(myWidth - 80, random(myHeight*0.1, myHeight*0.9), 80, 80, walking, standing, false);
  for(i = characters.length; i < game.totalSprites; i++){
    characters[i] = new Character(random(myWidth*0.1, myWidth*0.9), myHeight + 80, 80, 80, walking, standing, true);
  } 
}

function draw() {

  // each frame, check to see if time is up
  if(game.time - game.elapsed < 0)
    game.state = "gameover";
  
  clear();
  textSize(40);

  // switch statement for each game state
  switch(game.state){

    //Start state, black screen with white text. Needs key press to change state
    case "start":
      background(0);
      fill(255);
      text("Bug Squish", 40, myHeight/2);
      text("Press any key to start.", 40, myHeight/2 + 40);
      break;

    //Running state, gray screen with 10 bug sprites inititally. Adds a new bug every time this are less than half bugs remaining.
    case "running":
      background(230);
      if(game.remaining < game.totalSprites / 2){
        if(Math.round(Math.random()) == 1){
          characters[characters.length] = new Character(myWidth - 80, random(myHeight*0.1, myHeight*0.9), 80, 80, walking, standing, false);
          game.remaining += 1;
          characters[characters.length - 1].speed += game.score - 2; //Adding speed to compensate for bugs left on screen
        }else{
          characters[characters.length] = new Character(random(myWidth*0.1, myWidth*0.9), myHeight + 80, 80, 80, walking, standing, true);
          game.remaining += 1;
          characters[characters.length - 1].speed += game.score - 2; 
        }
      }
      for(i = 0; i < characters.length; i++){
        drawSprite(characters[i].sprite);
        characters[i].draw();
      }
      fill(0);
      text(game.score, 20, 50);
      text(ceil(game.time - game.elapsed), 20, 90);
      game.elapsed += deltaTime / 1000;
      break;

    // Game over. Black screen, red and white text. Resets game properties at this time and saves high score. Needs key press to advance game state.
    case "gameover":
      background(0);
      fill(128, 0, 0);
      text("GAME OVER!", 40, myHeight/2);
      fill(200);
      text("Press any key to reset.", 40, myHeight/2 + 40);
      if(game.score > game.maxScore)
        game.maxScore = game.score;
      text("Score: " + game.score, 40, myHeight/2 + 80);
      text("High Score: " + game.maxScore, 40, myHeight/2 + 120);
  }
}

// Calls object's individual mousePressed
function mousePressed() {
  for(i = 0; i < characters.length && game.state == "running"; i++){
    characters[i].mousePressed();
  }
}

function keyPressed() {
  if(game.state == "gameover"){
    game.reset();
  }
  game.state = "running";
}

class Character {
  constructor(dx, dy, h, w, walkAnim, standAnim, vertical) {

    this.dx = dx;
    this.dy = dy;
    this.h = h;
    this.w = w;
    this.walkAnim = walkAnim;
    this.standAnim = standAnim;
    this.touchLeft = false;
    this.touchRight = false;


    this.speed = 2 + Math.floor(Math.random() * 4);
    this.framerate = 9 - this.speed;
    this.walkAnim.frameDelay = this.framerate;

    //Sprite object within character
    this.sprite = createSprite(this.dx, this.dy, 30, 30);
    this.sprite.addAnimation('stand', this.standAnim);
    this.sprite.addAnimation('walk', this.walkAnim);
    this.sprite.changeAnimation('walk');

    //Game state purpose
    this.vertical = vertical;
    this.killed = false;

  }

  draw() {

    this.sprite.rotation = this.vertical ? 0 : 90;
    this.sprite.setSpeed(this.killed ? 0 : this.speed, this.vertical ? -90 : 0);

    // Chain of if statements to check for out of bounds behavior, and reset with slight jiggle
    if(this.sprite.position["x"] > myWidth + this.w/2){
      this.sprite.position["x"] = -this.w/2;
      this.sprite.position["y"] += Math.random() * 20
    }
    if(this.sprite.position["x"] < -this.w/2){
      this.sprite.position["x"] = myWidth + this.w/2;
      this.sprite.position["y"] += Math.random() * 20
    }
    if(this.sprite.position["y"] > myHeight + this.h/2){
      this.sprite.position["y"] = -this.h/2;
      this.sprite.position["x"] += Math.random() * 20
    }
    if(this.sprite.position["y"] < -this.h/2){
      this.sprite.position["y"] = myHeight + this.h/2;
      this.sprite.position["x"] += Math.random() * 20
    }
  }

  mousePressed() {

    //Mechanism to check if a bug is being squished
    //Could implement p5.play sprite.clicked method
    if(this.killed){
      return null;
    }
    if(Math.abs(this.sprite.position["x"] - mouseX) <= this.w/2 && Math.abs(this.sprite.position["y"] - mouseY) <= this.h/2) {
          this.killed = true;
          this.sprite.changeAnimation("stand");
          this.sprite.setSpeed(0, 0);
          game.score +=1
          game.increaseSpeed();
          game.remaining -= 1;
    }

  }
}
