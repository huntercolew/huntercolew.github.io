// Example constructor from class

let spritesheet;

let spriteArr = [];

function preload() {
    spritesheet = loadImage("spritesheet.png");
}

function setup() {
    createCanvas(400, 400);
    imageMode(CENTER);

    spriteArr[0] = new WalkingAnimation(spritesheet,80,80,200,200,9);

}

function draw() {
    background(235);
    spriteArr[0].draw();
}

function keyPressed() {
    spriteArr[0].keyPressed();
}

function keyReleased() {
    spriteArr[0].keyReleased();
}

class WalkingAnimation {
    constructor(spritesheet, sw, sh, dx, dy, animationLength) {
        this.spritesheet = spritesheet
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy;
        this.u = 0;
        this.v = 0;
        this.animationLength = animationLength;
        this.currentFrame = 0;
        this.moving = 0;
        this.xDirection = 1;
    }

    draw() {

        if(this.moving != 0) {
            this.u = this.currentFrame % this.animationLength;
        }else {
            this.u = 0;
        }

        push();
        translate(this.dx, this.dy);
        scale(this.xDirection, 1);

        image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw, this.sh)
        pop();

        if (frameCount % 2 == 0){
            this.currentFrame++;
        }

        this.dx+=this.moving;
    }

    keyPressed() {
        if(keyCode === RIGHT_ARROW) {
            this.moving = 4;
            this.xDirection = 1;
            this.currentFrame = 1;
        }
        if(keyCode === LEFT_ARROW) {
            this.moving = -4;
            this.xDirection = -1;
            this.currentFrame = 1;
        }
    }

    keyReleased() {
        if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
            this.moving = 0;
        }
    }
}