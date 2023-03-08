let initTone = true;
let pitch = 50
let variation = 0;
let counter = 0;
let frog;

// Set up Tone
let osc = new Tone.Oscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);

let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);

let env = new Tone.Envelope({
  attack: 0.01,
  decay: 0.01,
  sustain: 0.5,
  release: 0.25
}).connect(gain);

osc.type = "sawtooth";

osc.connect(ampEnv);


function setup() {
  createCanvas(400, 400);
  frog = loadImage('frog.jpg');
}

function draw() {
  background(220);
  pitch = 40;

  image(frog, 200 - frog.width/4, 225 - frog.height/4, frog.width/2, frog.height/2);
  
  if(counter == 0){
    push();
    fill(color(220));
    noStroke();
    square(200 - frog.width/4, 220 - frog.height/4, frog.width/2);
    pop();
  }

  counter = counter == 0 ? counter : counter - 1

  text('press spacebar to initialize audio!', 100, 100);

}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {

  counter = 60;
  
  variation = Math.random()*10;

  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
  osc.frequency.setValueAtTime(pitch-variation);
  ampEnv.triggerAttackRelease('16n', '+4n');
  osc.frequency.setValueAtTime(pitch+variation, '+4n');
}