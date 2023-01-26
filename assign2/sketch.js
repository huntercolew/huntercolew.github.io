var selection;

function setup() {
  createCanvas(1200, 900);
  background(255, 255, 255);
  selection = color(0, 0, 0);
}



function draw() {
  stroke(255, 255, 255);
  strokeWeight(2);
  let palette = [color(255, 0, 0), color(255, 128, 0), color(255, 255, 0), color(0, 255, 0), color(0, 255, 255), color(0, 0, 255), color(255, 0, 255), color(140, 70, 20), color(255, 255, 255), color(0, 0, 0)]
  for(let i = 0; i <= palette.length - 1; i++){
    fill(palette[i]);
    square(0, 32*i, 32)
    fill(selection);
  }

}

function mouseClicked() {
  if (mouseX <= 32 && mouseY < 10*32){
    selection = get(mouseX, mouseY);
    console.log(selection);
  } else {
    strokeWeight(0)
    fill(selection);
    circle(mouseX, mouseY, 10, 10)
  }
}

function mouseDragged() {
  stroke(selection);
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
