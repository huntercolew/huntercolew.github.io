//This script was built using P5.play library

let bg;
var walking;
var standing;
var characters = [];
var i;
let myWidth = 600;
let myHeight = 600;
let initTone = false;
let testMode = false;
let loop;
let looping = false;
let powerLevel = 0;
let timeCounter = 0;

let soundList = {

  "squish": "sounds/squish.mp3",
  "run": "sounds/creeping.mp3",
  "power": "sounds/power.mp3",
  "womp": "sounds/womp-womp.mp3",
  "victory": "sounds/victory.mp3"

};

let sounds = new Tone.Players(soundList).toDestination();

let game = {
  time: 10,
  elapsed: 0,
  score: 0,
  maxScore: 0,
  totalSprites: 10,
  remaining: 10,
  played: false,
  state: "start",
  reset: function () {
    // function to reset score, killed bugs, and game properties such as speed and score.
    populateChars();
    characters = characters.slice(0, 10);
    this.elapsed = 0;
    this.score = 0;
    this.played = false;
    remaining = 10;
  },
  increaseSpeed: function () {
    // function to increment speed of bugs as they are squished
    for(i = 0; i < characters.length; i++){
      if(!testMode && characters[i])
        characters[i].speed += 1
    }
    powerLevel += 1;
    //pitch.pitch = powerLevel * 2;
    playSound("power");
  }
}



function preload() {
  walking = loadAnimation(loadSpriteSheet('bug.png', 80, 80, 4));
  standing = loadAnimation(loadSpriteSheet('bug2.png', 80, 80, 1));
}



function setup() {
  bg = loadImage('bg.jpg');
  createCanvas(myWidth, myHeight);
  populateChars();
}

function draw() {

  // each frame, check to see if time is up
  if(game.time - game.elapsed < 0 && !testMode)
    game.state = "gameover";
  
  clear();
  textSize(40);

  // switch statement for each game state
  switch(game.state){

    //Start state, black screen with white text. Needs key press to change state
    case "start":
      background(128);
      fill(255);

      drawSprite(characters[0].sprite);
      characters[0].draw();
      timeCounter += deltaTime / 1000;

      // delta = Math.random()*15
      // if(timeCounter % 2 < 1){
      //   characters[0].sprite.rotation += delta
      //   characters[0].sprite.setSpeed(characters[0].sprite.rotation + 90)
      // }

      text("Bug Squish", 40, myHeight/2);
      text("Press any key to start.", 40, myHeight/2 + 40);

      break;

    //Running state, gray screen with 10 bug sprites inititally. Adds a new bug every time this are less than half bugs remaining.
    case "running":
      background(bg);
    
      loop = new Tone.Loop(()=>playSound("run"), 22);
      if(!looping)
        toggleScuffle();

      if(game.remaining < game.totalSprites / 2 + 2){
        if(Math.round(Math.random()) == 1){
          characters[characters.length] = new Character(-80, random(myHeight*0.1, myHeight*0.9), 80, 80, walking, standing, Math.random()*175 + 5);
          game.remaining += 1;
          if(!testMode)
            characters[characters.length - 1].speed += game.score - 2; //Adding speed to compensate for bugs left on screen
          
        }else{
          characters[characters.length] = new Character(random(myWidth*0.1, myWidth*0.9), myHeight + 80, 80, 80, walking, standing, Math.random()*180 + 175);
          game.remaining += 1;
          if(!testMode)
            characters[characters.length - 1].speed += game.score - 2; 
        }
      }
      for(i = 0; i < characters.length; i++){
        if(!characters[i].isDecayed()){
          drawSprite(characters[i].sprite);
          characters[i].draw();
        }
        if(game.time % 5 == 0 && characters[i].killed){
          characters[i].decay();
        }
      }
      fill(0);
      text(game.score, 20, 50);
      if(!testMode)
        text(ceil(game.time - game.elapsed), 20, 90);
        game.elapsed += deltaTime / 1000;

      break;

    // Game over. Black screen, red and white text. Resets game properties at this time and saves high score. Needs key press to advance game state.
    case "gameover":
      if(looping && loop.mute == false)
        toggleScuffle();
        loop.mute = true;

      background(0);
      fill(128, 0, 0);

      if(!testMode)
        game.elapsed += deltaTime / 1000;

      if(game.elapsed % 2 < 1)
        text("GAME OVER!", 40, myHeight/2);

      fill(200);
      text("Press any key to reset.", 40, myHeight/2 + 40);

      if(game.played == false){
        playSound(game.score > game.maxScore ? "victory" : "womp");
        game.played = true;
      }
      if(game.score > game.maxScore)
        game.maxScore = game.score;

      text("Score: " + game.score, 40, myHeight/2 + 80);
      text("High Score: " + game.maxScore, 40, myHeight/2 + 120);

  }
}

function populateChars() {
  for(i = 0; i < game.totalSprites/2; i++)
    characters[i] = new Character(-80, random(myHeight*0.1, myHeight*0.9), 80, 80, walking, standing, Math.random()*175 + 5);
  for(i = characters.length; i < game.totalSprites; i++){
    characters[i] = new Character(random(myWidth*0.1, myWidth*0.9), myHeight + 80, 80, 80, walking, standing, Math.random()*180 + 175);
  } 
}

// Calls object's individual mousePressed
function mousePressed() {
  for(i = 0; i < characters.length && game.state == "running"; i++){
    characters[i].mousePressed();
  }
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }

  if(game.state == "gameover"){
    game.reset();
  }
  game.state = "running";
}

function playSound(name) {
  console.log("I was called");
  sounds.player(name).start();
}

function toggleScuffle() {
  if(!looping){
    console.log(loop.state);
    loop.start();
    Tone.Transport.start();
    console.log(loop.state);
  }else{
    loop.stop();
  }
  looping = !looping;
}

class Character {
  constructor(dx, dy, h, w, walkAnim, standAnim, vertical) {

    this.dx = dx;
    this.dy = dy;
    this.h = h;
    this.w = w;
    this.walkAnim = walkAnim;
    this.standAnim = standAnim;

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
    //Time before removing
    this.time = 60;

  }

  draw() {
    this.sprite.rotation = this.vertical + 90;
    this.sprite.setSpeed(this.killed ? 0 : this.speed, this.vertical);

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
    if(this.killed){
      return null;
    }
    if(Math.abs(this.sprite.position["x"] - mouseX) <= this.w/2 && Math.abs(this.sprite.position["y"] - mouseY) <= this.h/2) {
          this.killed = true;
          playSound("squish");
          this.sprite.changeAnimation("stand");
          this.sprite.setSpeed(0, 0);
          game.score +=1
          game.score % 5 == 0 ? game.increaseSpeed() : game.score = game.score;
          game.remaining -= 1;
    }

  }

  decay() {
    this.time -= 1;
  }

  isDecayed(){
    return this.time <= 0;
  }
}
