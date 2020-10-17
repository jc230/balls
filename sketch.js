let balls = [];
let ballCount =10;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < ballCount; i++) {
    balls[i] = new Ball(random() * width, random() * height);
  }
}

function draw() {
  background(220);
  for (let i = 0; i < ballCount; i++) {
    balls[i].draw();
    
    balls[i].ballColision(i);
    balls[i].update();
  }
}

class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.speed = p5.Vector.random2D();
    this.radius = 10 + 50 * random();
  }
  draw() {
    noFill();
    stroke('black');
    circle(this.position.x, this.position.y, 2 * this.radius);
    line(this.position.x, this.position.y, this.position.x + 50*this.speed.x, this.position.y + 50*this.speed.y);
    //text(this.speed.x,this.position.x,this.position.y);
  }
  update() {
    'colision with the walls check'
    if (this.position.x < this.radius) this.speed.x = abs(this.speed.x);
    if (this.position.x > height - this.radius) this.speed.x = -abs(this.speed.x);
    if (this.position.y < this.radius) this.speed.y = abs(this.speed.y);
    if (this.position.y > width - this.radius) this.speed.y = -abs(this.speed.y);

    
    this.position.add(this.speed);
  }
  ballColision(i){
    'colision between balls check'
    for (let j = i+1; j < ballCount; j++) {
        let normal = p5.Vector.sub(balls[j].position,this.position);
        let overlap = this.radius + balls[j].radius - normal.mag(); 'positive overlap, negative not overalp'
       
        'if the balls are touching'
      
        if (overlap > 0) {
          'folowing later do only when they are touching'
        this.position.sub(normal.copy().setMag(overlap/2));
        balls[j].position.add(normal.copy().setMag(overlap/2));
        let normDir= normal.copy().normalize();
        let speed1Norm = normal.copy().setMag(p5.Vector.dot(normDir,this.speed)/this.speed.mag());;
        let speed1Tang = p5.Vector.sub(this.speed,speed1Norm);
        let speed2Norm = normal.copy().setMag(p5.Vector.dot(normDir,balls[j].speed)/balls[j].speed.mag());;
        let speed2Tang = p5.Vector.sub(balls[j].speed,speed2Norm);
      
      
        stroke('blue');
        line(this.position.x,this.position.y,this.position.x+normal.x,this.position.y+normal.y);
        stroke('red');
        line(this.position.x,this.position.y,this.position.x+50*speed1Norm.x,this.position.y+50*speed1Norm.y);
       line(balls[j].position.x,balls[j].position.y,balls[j].position.x+50*speed2Norm.x,balls[j].position.y+50*speed2Norm.y);
        stroke('green');
        line(this.position.x,this.position.y,this.position.x+50*speed1Tang.x,this.position.y+50*speed1Tang.y);
        line(balls[j].position.x,balls[j].position.y,balls[j].position.x+50*speed2Tang.x,balls[j].position.y+50*speed2Tang.y);
          this.speed = p5.Vector.sub(speed2Tang,speed1Norm);
          balls[j].speed = p5.Vector.sub(speed1Tang,speed2Norm);
          'if the ball is heading towards the other'
         // if (abs(normal.angleBetween(balls[j].speed)) < PI / 2) {
         //   this.speed.reflect(p5.Vector.sub(this.position, balls[j].position))
         // }
        }
      }
    
  }

}