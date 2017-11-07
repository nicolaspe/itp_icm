var balls;
var library;
var book;

function preload() {
  library = loadImage('lib.jpg')
  book = loadImage('fbook.jpg')
}



function setup() {
  createCanvas(1200,900);
  balls = new Ball(width/2,height/2);
}


function draw() {
 // background(library);
  image(library,0,0);
  balls.move();
  balls.display();
  
  
  
}





class Ball {
   
  constructor(x,y) {
  this.x = x; 
  this.y = y;
  this.xspeed = 3;
  this.yspeed = 2.7;
  }


   move() {
    
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * -1;
    }
    
      if (this.y > height || this.y < 0) {
      this.yspeed = this.yspeed * -1;
    }
  }
  
   display() {
    // scale(0.4);
    image(book,this.x,this.y, 105, 136);
  }
}