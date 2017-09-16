var t = 0;		// time keeper
var fR = 60;	// frameRate

// orbit variables
var orbitCenter, orbitAngle, orbitRadius;
// colours
var day, ray, sun, moon;

function setup(){
	createCanvas(640, 480);
	// setup basic things I need for everything to work correctly
	colorMode(HSB, 360, 100, 100, 100);
	noStroke();
	frameRate(fr);

	// Orbits and objects
	// orbitCenter = createVector(width/2, height*1.5+height*.2);
	orbitCenter = createVector(width/2, height/2);
	orbitRadius = height/4;
	orbitAngle = PI*1.3;
	sun = color(37, 64, 100, 100);
	moon = color(295, 18, 76, 100);
}

function draw(){
	background(190);

  drawSun();
  drawMoon();

  t++;
  orbitAngle += radians(1/5);
}

function drawSun(){
	push();
	translate(orbitCenter.x, orbitCenter.y);
  rotate(orbitAngle);
  noStroke();
	fill(sun);
	ellipse(orbitRadius, 0, 100, 100);
	pop();
}

function drawMoon(){
  push();
	translate(orbitCenter.x, orbitCenter.y);
  rotate(orbitAngle);
  fill(moon)
  ellipse(-orbitRadius, 0, 50, 50);
  stroke(0);
	pop();
}
