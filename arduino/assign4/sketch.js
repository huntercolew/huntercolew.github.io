//This script was built using P5.play library

const encoder = new TextEncoder();
let sensorData = {};
let activationState = { active: false };
let port;
let writer, reader;
let sensX, sensY;
let xVal, yVal = 300;
let beamIsOn = false;
let lastKilled = -1;

let bg;
var walking;
var standing;
var characters = [];
var i;
let myWidth = 600;
let myHeight = 600;
let initTone = false;
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
  time: 30,
  elapsed: 0,
  score: 0,
  maxScore: 0,
  totalSprites: 10,
  remaining: 10,
  played: false,
  state: "start",
  testMode: false,
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
      if(!game.testMode && characters[i])
        characters[i].speed += 1
    }
    powerLevel += 1;
    playSound("power");
  },
  toggleTest: function () {
    if(this.testMode)
      this.reset();
    this.testMode = !this.testMode;
  }
}



function preload() {
  walking = loadAnimation(loadSpriteSheet('bug.png', 80, 80, 4));
  standing = loadAnimation(loadSpriteSheet('bug2.png', 80, 80, 1));
}



function setup() {
  bg = loadImage('bg.jpg');
  createCanvas(myWidth, myHeight);

  //buttons to enable serial communication
  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("Connect");
    button.position(620,20);
    button.mousePressed(connect);
    let button2 = createButton("Test Mode");
    button2.position(620,60);
    button2.mousePressed(() => game.toggleTest());
  }

  populateChars();
}

function draw() {

  // each frame, check to see if time is up
  if(game.time - game.elapsed < 0 && !game.testMode)
    game.state = "gameover";
  
  clear();
  textSize(40);


  if (activationState.active) {
    sensX = sensorData.x;
    sensY = sensorData.y;

    beamIsOn = sensorData.switch;

    xVal = sensX;
    yVal = sensY;

    //toggleLED();
    
  }

  if (reader) {
    serialRead();
  }

  // switch statement for each game state
  switch(game.state){

    //Start state, black screen with white text. Needs key press to change state
    case "start":
      background(128);
      fill(255);
      drawSprite(characters[0].sprite);
      characters[0].draw();
      timeCounter += deltaTime / 1000;
      text("Bug Squish", 40, myHeight/2);
      text("Press any key to start.", 40, myHeight/2 + 40);
      text("Press joystick for beam.", 40, myHeight/2 + 80);
      break;

    //Running state, gray screen with 10 bug sprites inititally. Adds a new bug every time this are less than half bugs remaining.
    case "running":
      background(bg);
      if(game.testMode)
        text("DEV MODE", myWidth/2 - 40, 40);
      loop = new Tone.Loop(()=>playSound("run"), 22);
      if(!looping)
        toggleScuffle();
      if(game.remaining < game.totalSprites / 2 + 2){
        if(Math.round(Math.random()) == 1){
          characters[characters.length] = new Character(-80, random(myHeight*0.1, myHeight*0.9), 80, 80, walking, standing, Math.random()*175 + 5);
          game.remaining += 1;
          if(!game.testMode)
            characters[characters.length - 1].speed += game.score - 2; //Adding speed to compensate for bugs left on screen
        }else{
          characters[characters.length] = new Character(random(myWidth*0.1, myWidth*0.9), myHeight + 80, 80, 80, walking, standing, Math.random()*180 + 175);
          game.remaining += 1;
          if(!game.testMode)
            characters[characters.length - 1].speed += game.score - 2; 
        }
      }
      for(i = 0; i < characters.length; i++){
        if(!characters[i].isDecayed()){
          drawSprite(characters[i].sprite);
          characters[i].draw();
        }
        if(game.time % 5 == 0 && typeof characters[i] !== 'undefined'){
            characters[i].decay();
        }
      }

      push();
      if(beamIsOn){
        fill(245, 236, 66, 64);
      }else{
        noFill();
      }
      strokeWeight(2);
      stroke(51);
      circle(xVal, yVal, 25);
      // line(myWidth*0.9, myHeight, xVal - 9, yVal + 9);
      // line(myWidth, myHeight*0.9, xVal + 9, yVal - 9);
      noStroke();
      //fill(245, 236, 66, 64);
      beginShape(TRIANGLE_STRIP);
      vertex(myWidth, myHeight*1.2);
      vertex(xVal - 9, yVal + 9);
      vertex(myWidth*1.2, myHeight);
      vertex(xVal + 9, yVal - 9);
      endShape();
      pop();

      fill(0);
      text(game.score, 20, 50);
      if(!game.testMode)
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

      if(!game.testMode)
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
    game.state = 'running';
  }
  if(game.state == "start"){
    activationState.active = !activationState.active;
    //serialWrite(activationState);
    game.state = "running";
  }
  

}

function playSound(name) {
  sounds.player(name).start(0);
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

    //Statement to check if sprite is being "burned" by joystick x and y
    if(beamIsOn && !this.killed){
      if(activationState.active){
        if(abs(this.sprite.position['x'] - xVal) +  abs(this.sprite.position['y'] - yVal) < 50){
          console.log("Killed!!")
          this.kill();
        }
      }
    }

  }

  mousePressed() {

    //Mechanism to check if a bug is being squished
    if(this.killed){
      return null;
    }
    if(Math.abs(this.sprite.position["x"] - mouseX) <= this.w/2 && Math.abs(this.sprite.position["y"] - mouseY) <= this.h/2) {
      this.kill();
    }

  }

  kill() {
    this.killed = true;
    playSound("squish");
    this.sprite.changeAnimation("stand");
    this.sprite.setSpeed(0, 0);
    game.score +=1
    writeScore();
    game.score % 5 == 0 ? game.increaseSpeed() : game.score = game.score;
    game.remaining -= 1;
    lastKilled = 0;
  }

  decay() {
    if(this.killed)
      this.time -= 1;
  }

  isDecayed(){
    return this.time <= 0;
  }
}

async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  writer = port.writable.getWriter();
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    console.log(value);
    sensorData = JSON.parse(value);
  }
}

async function serialWrite(output, isJSON) {
  if (writer) {
    if(isJSON){
      writer.write(encoder.encode(JSON.stringify(output)+"\n"));
    }else{
      writer.write(encoder.encode(output+"\n"));
    }
    
  }
}

function toggleLED() {
  serialWrite({toggleLED: true}, true); // Send toggle LED command to arduino
}

function writeScore() {
  serialWrite({score: game.score}, true);
  //serialWrite(game.score, false);
}

class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}
