const encoder = new TextEncoder();
let sensorData = {};
let activationState = { active: false };
let port;
let writer, reader;
let xVal, yVal;
let beamIsOn = false;
let rotation;

let codes = [Math.floor(Math.random(0, 99)), Math.floor(Math.random(0, 99)), Math.floor(Math.random(0, 99))];
let currentCodeIndex = 0;


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
  "victory": "sounds/victory.mp3"

};

let sounds = new Tone.Players(soundList).toDestination();

let game = {
  time: 30,
  elapsed: 0,
  played: false,
  state: "start",
  testMode: true,
  reset: function () {
    // function to reset  game properties such as time.

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



  // each frame, check to see if time is up
  if(game.time - game.elapsed < 0 && !game.testMode)
    game.state = "gameover";
  
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

    //Running state, gray screen with 10 bug sprites inititally. Adds a new bug every time this are less than half bugs remaining.
    case "running":
      background(bg);

      let angle;
      let rotation;
      if(activationState.active){
          // map joystick input to rotation angle
        let x = map(map(xVal, 0, 1023, 0, width), 0, width, -1, 1);
        let y = map(map(yVal, 0, 1023, 0, height), 0, height, -1, 1);
        angle = degrees(atan2(y, x));
      }else{
        angle = map(mouseX, 0, width, 0, TWO_PI); // map mouseX position to angle between 0 and 360 degrees
      }


      // calculate joystick magnitude and angle
      let joystickMag = abs(xVal);
      let joystickSign = xVal >= 0 ? 1 : -1;

      // add joystick angle to rotation
      let rotationDelta = map(joystickMag, 0, 512, 0, PI/100) * joystickSign;
      rotation += rotationDelta;

      if (rotation < 0) {
        rotation += TWO_PI;
      }
      if (rotation > TWO_PI) {
        rotation -= TWO_PI;
      }

      
      push(); // isolate transformation matrix
      translate(width/2, height/2); // move to center of canvas
      imageMode(CENTER);
      image(dialOuter, 0, 0, 360, 360);
      rotate(rotation); // rotate by angle
      image(dialCenter, 0, 0, 360, 360); // draw image
      pop(); // restore transformation matrix

      let currentCode = floor(map(angle, 0, 360, 0, 99));

      // check whether current code matches current guess
      let targetCode = codes[currentCodeIndex];
      let diff = abs(currentCode - targetCode);
      if (diff <= 0.05 * 100) {
        // correct guess, move on to next code
        currentCodeIndex++;
        if (currentCodeIndex >= codes.length) {
          // all codes guessed correctly, do something here
          currentCodeIndex = 0;
        }
      }

      text(currentCode, 20, 45);


      if(game.testMode)
        text("DEV MODE", myWidth/2 - 40, 40);
      loop = new Tone.Loop(()=>playSound("run"), 22); //ADD SOUND
      if(!looping)
        toggleLoop();

      fill(0);
      if(!game.testMode)
        text(ceil(game.time - game.elapsed), 20, 90);
      game.elapsed += deltaTime / 1000;

      
      break;

    // Game over. Black screen, red and white text. Resets game properties at this time and saves high score. Needs key press to advance game state.
    case "gameover":
      if(looping && loop.mute == false)
        toggleLoop();
        loop.mute = true;

      background(0);
      fill(128, 0, 0);

      if(!game.testMode)
        game.elapsed += deltaTime / 1000;

      if(game.elapsed % 2 < 1)
        text("GAME OVER!", 40, myHeight/2);

      fill(200);
      text("Press any key to reset.", 40, myHeight/2 + 40);

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

function toggleLoop() {
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
