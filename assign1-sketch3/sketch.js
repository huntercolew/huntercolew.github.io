function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(0);
  noStroke();

  //colors
  y = color(255, 255, 0);
  blk = color(0);
  r = color(255, 0, 0);
  w = color(255, 255, 255);
  bl = color(0, 0, 255);

  //pacman  
  fill(y);
  circle(150, 150, 250, 250);
  fill(blk);
  triangle(0, 0, 150, 150, 0, 300);

  //ghost
  fill(r);
  circle(450, 150, 250, 250);
  rect(325, 150, 250, 125);
  fill(w);
  circle(395, 150, 70, 70);
  circle(505, 150, 70, 70);
  fill(bl);
  circle(395, 150, 45, 45);
  circle(505, 150, 45, 45);

}
