const encoder = new TextEncoder();
let sensorData = {};
let activationState = { active: false };
let port;
let writer, reader;
let xVal, yVal;
let beamIsOn = false;
let angle = 0;

let codes = [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), -100];
let currentCodeIndex = 0;
let currentCode;
let duration = 0;

 

let bg=0;
var i=0;
let myWidth = 600;
let myHeight = 600;
let initTone = false;
let loop;
let looping = false;
let timeCounter = 0;

let dialCenter, dialOuter;

let soundList = {

  "squish": "sounds/squish.mp3",
  "run": "sounds/creeping.mp3",
  "power": "sounds/power.mp3",
  "womp": "sounds/womp-womp.mp3",
  "victory": "sounds/victory.mp3",
  "click": "sounds/click.mp3"

};

osc = new Tone.Oscillator().toDestination();

// Create a gain object to control the volume
gain = new Tone.Gain(0.01).toDestination();
osc.connect(gain);

let sounds = new Tone.Players(soundList).toDestination();



let game = {
  time: 30,
  elapsed: 0,
  highscore: 100,
  played: false,
  state: "start",
  testMode: false,
  direction: 1,
  reset: function () {
    // function to reset  game properties such as time.
    codes = [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), -100];
    currentCodeIndex = 0;
    this.elapsed = 0;
    this.played = false;
  },
  gameFunc: function () {

  },
  toggleTest: function () {
    if(this.testMode)
      this.reset();
    this.testMode = !this.testMode;
  }
}

function preload() {
  bg = loadImage('bg.jpg');
  dialCenter = loadImage('dialCenter.png');
  dialOuter = loadImage('dialOuter.png');
}

function setup() {

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


  
}

function draw() {
  
  clear();
  textSize(40);

  if (activationState.active) {
    xVal = sensorData.x;
    yVal = sensorData.y;

    beamIsOn = sensorData.switch;
  }

  if (reader) {
    serialRead();
  }

  // switch statement for each game state
  switch(game.state){

    //Start state, black screen with white text. Needs key press to change state
    case "start":
      // background(128);
      background(bg);
      fill(128, 128, 128, 128);
      square(0, 0, width);
      fill(255);
      timeCounter += deltaTime / 1000;
      text("Safe Crack", 40, myHeight/2);
      text("Press any key to start.", 40, myHeight/2 + 40);
      text("Use joystick to control dial.", 40, myHeight/2 + 80);
      break;

    //Running state
    case "running":
      background(bg);
      fill(255);

      if(game.direction > 0 && xVal < 0){
        xVal = 0;
      }

      if(game.direction < 0 && xVal > 0){
        xVal = 0;
      }

      angle += 0.05 * xVal/90;

      if(game.testMode){
        text(xVal, 20, 45);
        text(angle, 20, 75);
      }


    
      angle = angle % TWO_PI;
    
      if (angle < 0) {
        angle += TWO_PI;
      }

      currentCode = 100 - Math.floor(map(angle, 0, TWO_PI, 0, 100));

      if (currentCodeIndex <= 3 
        && Math.abs(xVal) < 40 
        && (Math.abs(codes[currentCodeIndex] - currentCode) <= 3 || Math.abs(codes[currentCodeIndex] - currentCode % 97) <= 3)){
        duration += deltaTime;

        
      }else{
        duration = 0;
      }

      if(duration>250){
        duration = 0;
        currentCodeIndex++;
        playSound("click");
        writeCodes();
        game.direction = game.direction * -1;
        if(currentCodeIndex >= 3){
          game.state = "gameover";
        }
      }

      const diff = abs(codes[currentCodeIndex] - currentCode);

      // Map the difference to a range of frequencies
      const freq = map(diff, 0, 50, 75, 50);
    
      // Set the frequency of the oscillator
      osc.frequency.value = abs(freq);
    
      // Check if the diff is within a certain threshold
      if (abs(diff) < 50) {
        // Start the oscillator if it's not already started
        if (osc.state !== "started") {
          osc.start();
        }
      } else {
        // Stop the oscillator if it's currently started
        if (osc.state === "started") {
          osc.stop();
        }
      }
    


      if(game.testMode){
        text(currentCode, 20, 105);
        text(codes[currentCodeIndex] + " #" + currentCodeIndex, 20, 135)
      }

      fill(0);
      rect(20, myHeight - 90, 180 + 90*4, 50);
      fill(255);
      text("Codes:", 30 + 30*i, myHeight - 50);
      for(let i = 0; i <= currentCodeIndex - 1; i++){
        text(codes[i], 180 + 90*i, myHeight - 50);
      }

      

      
      push(); // isolate transformation matrix
      translate(width/2, height/2); // move to center of canvas
      imageMode(CENTER);
      image(dialOuter, 0, 0, 360, 360);
      rotate(angle); // rotate by angle
      image(dialCenter, 0, 0, 360, 360); // draw image
      pop(); // restore transformation matrix



      if(game.testMode)
        text("DEV MODE", myWidth/2 - 40, 40);
      loop = new Tone.Loop(()=>playSound("run"), 22); //ADD SOUND
      if(!looping)
        toggleLoop();


      fill(0);
      rect(20, 60, 50, 40);
      fill(255);
      if(!game.testMode)
        text(ceil(game.elapsed), 20, 90);
      game.elapsed += deltaTime / 1000;



      
      break;

    // Game over. Black screen, red and white text. Resets game properties at this time and saves high score. Needs key press to advance game state.
    case "gameover":
      if(looping && loop.mute == false)
        toggleLoop();
        loop.mute = true;

      background(0);
      fill(128, 0, 0);


      text("GAME OVER!", 40, myHeight/2);

      fill(200);
      text("Press any key to reset.", 40, myHeight/2 + 40);

      text("Codes:", 30 + 30*i, myHeight - 50);
      for(let i = 0; i <= currentCodeIndex - 1; i++){
        text(codes[i], 180 + 90*i, myHeight - 50);
      }

      if(game.played == false){
        playSound(game.elapsed < game.highscore ? "victory" : "womp");
        game.played = true;
      }
      if(game.elapsed < game.highscore)
        game.highscore = game.elapsed;

      text("Score: " + ceil(game.elapsed) + " seconds", 40, myHeight/2 + 80);
      text("High Score: " + ceil(game.highscore) + " seconds", 40, myHeight/2 + 120);
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
    writeCodes();
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

function toggleLoop() {
  // if(!looping){
  //   console.log(loop.state);
  //   loop.start();
  //   Tone.Transport.start();
  //   console.log(loop.state);
  // }else{
  //   loop.stop();
  // }
  // looping = !looping;
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

function writeCodes() {
  serialWrite({code1: codes[0], code2: codes[1], code3: codes[2], currCode: currentCodeIndex}, true);
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
