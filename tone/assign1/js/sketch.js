let soundList = {

  "drink": "sounds/drinking.mp3",
  "bruh": "sounds/bruh.mp3",
  "yell": "sounds/wilhelm.wav",
  "leg": "sounds/myleg.mp3"

};
let sounds = new Tone.Players(soundList);

let button1, button2, button3;
let slider;
let dist;
let sound;

function setup() {
  createCanvas(400, 400);

  dist = new Tone.Distortion(0).toDestination();
  pitchS = new Tone.PitchShift().toDestination();
  del = new Tone.FeedbackDelay("8n", 0.5).toDestination();

  sounds.chain(dist, pitchS, del);


  slider = createSlider(0, 10, 0, 1);
  slider.position(200, 50);
  slider.style('width', '100px');

  slider2 = createSlider(-12, 12, 0, 1);
  slider2.position(200, 150);
  slider2.style('width', '100px');

  slider3 = createSlider(0, 1, 0, 0);
  slider3.position(200, 250);
  slider3.style('width', '100px');

  wetSlide1 = createSlider(0, 1, 0, 0);
  wetSlide1.position(200, 100);
  wetSlide1.style('width', '100px');

  wetSlide2 = createSlider(0, 1, 0, 0);
  wetSlide2.position(200, 200);
  wetSlide2.style('width', '100px');

  wetSlide3 = createSlider(0, 1, 0, 0);
  wetSlide3.position(200, 300);
  wetSlide3.style('width', '100px');
  
  button1 = createButton("Drink Me");
  button1.position(40, 50);
  button1.mousePressed(() => playSound("drink"));

  button2 = createButton("Bruh Me");
  button2.position(40, 100);
  button2.mousePressed(() => playSound("bruh"));

  button3 = createButton("Yell Me");
  button3.position(40, 150);
  button3.mousePressed(() => playSound("yell"));

  button4 = createButton("Leg Me");
  button4.position(40, 200);
  button4.mousePressed(() => playSound("leg"));

  sounds.toDestination();
}

function draw() {
  background(220);
  dist.distortion = slider.value();
  dist.wet.value = wetSlide1.value();
  pitchS.pitch = slider2.value();
  pitchS.wet.value = wetSlide2.value();
  del.delayTime.value = slider3.value();
  del.wet.value = wetSlide3.value();

  textSize(15);
  text("Sound Sampler", 40, 40);
  text("Distortion Level: " + dist.distortion, 200, 40); 
  text("Pitch Shift Level: " + pitchS.pitch, 200, 140); 
  text("Delay Level: " + Math.floor(del.delayTime.value*100) + "%", 200, 240);
  text("Distortion Wet: " + Math.floor(dist.wet.value*100) + "%", 200, 90); 
  text("Pitch Shift Wet: " + Math.floor(pitchS.wet.value*100) + "%", 200, 190); 
  text("Delay Wet: " + Math.floor(del.wet.value*100) + "%", 200, 290);

}

function playSound(name) {

  sounds.player(name).start();
}