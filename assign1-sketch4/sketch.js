function setup() {
  createCanvas(300, 300);
}

//star function from p5.js documentation
// p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {
  background(0, 0, 128);
  noStroke();

  wh = color(255, 255, 255);
  gr = color(0, 128, 0);
  r = color(255, 0, 0);

  fill(wh);
  circle(150, 150, 200, 200);
  fill(gr);
  circle(150, 150, 190, 190);
  
  fill(wh);
  translate(150, 150);
  rotate(PI / 2)
  star(0, 0, 100, 40, 5);
  fill(r);
  star(0, 0, 85, 34, 5);

  
}
