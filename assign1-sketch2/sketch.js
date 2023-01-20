function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255, 255, 255);

  function myCircle(color, pos){
    let a = color;
    a.setAlpha(100);
    fill(a);
    noStroke();
    circle(pos[0], pos[1], pos[2], pos[3])
  }

  myCircle(color(255, 0, 0), [300, 200, 300, 300])
  myCircle(color(0, 0, 255), [200, 400, 300, 300])
  myCircle(color(0, 255, 0), [400, 400, 300, 300])

  
}
