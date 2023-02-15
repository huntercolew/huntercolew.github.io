let sound1 = new Tone.Player("sounds/bonk.wav");

let sounds = new Tone.Players({

  "bonk": "sounds/bonk.wav",
  "squish": "sounds/squish.wav",
  "rip": "sounds/velcro.wav"

})

let button1;

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Bonk Me");
  button1.position(40, 40);
  button1.mousePressed(() => playSound("bonk"));

  button2 = createButton("Squish Me");
  button2.position(40, 80);
  button2.mousePressed(() => playSound("squish"));

  button3 = createButton("Rip Me");
  button3.position(40, 120);
  button3.mousePressed(() => playSound("rip"));

  // sound1.toDestination();
  sounds.toDestination();
}

function draw() {
  background(220);
}

// function keyPressed() {
//   sound1.playbackRate = (mouseY/200 + 0.01);
//   sound1.start();
// }

function playSound(name) {
  sounds.player(name).start();
}