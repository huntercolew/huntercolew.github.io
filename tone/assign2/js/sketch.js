

const synth = new Tone.DuoSynth();

const dist = new Tone.Distortion(0).toDestination();

synth.connect(dist);


let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

let slider;

function setup() {
  createCanvas(400, 400);
  synth.toDestination();

  slider = createSlider(0, 10, 0, 0);
  slider.position(140, 150);
  slider.style('width', '100px');
  

}

function draw() {
  background(220);
  dist.distortion = slider.value();

  textSize(25);
  text("Synth Assignment", 105, 50);
  textSize(15);
  text("Distortion Level", 140, 140);
  text("Use key A, S, D, F, G, H, J, and K", 50, 300);
  text("to play C4, D4, E4, F4, G4, A4, B4,", 50, 320);
  text("and C5 respectively.", 50, 340);
}

function keyPressed() {
  console.log(slider.value() + " " + dist.distortion);
  let whatNote = notes[key]
  synth.harmonicity.value = 0.3
  synth.triggerAttackRelease(whatNote, "2n");
}