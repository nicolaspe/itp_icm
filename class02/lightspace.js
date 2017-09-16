var t = 0;		// time keeper
var fR = 60;	// frameRate

// orbit variables
var orbitCenter, orbitAngle, orbitRadius;
// colours
var day, ray, sun, moon, sun2;

function setup(){
	createCanvas(640, 480);
	// setup basic things I need for everything to work correctly
	colorMode(HSB, 360, 100, 100, 100);
	noStroke();
	frameRate(fr);

	// Orbits and objects
	// orbitCenter = createVector(width/2, height*1.5+height*.2);
	orbitCenter = createVector(width/2, height);
	orbitRadius = height*0.8;
	orbitAngle = PI*1.3;
	sun = color(37, 64, 100, 100);
	sun2 = color(37, 64, 100, 15);
	moon = color(295, 18, 76, 100);
	moon2 = color(295, 18, 76, 5);
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
	fill(sun2);
	ellipse(orbitRadius, 0, 400, 400);
	ellipse(orbitRadius, 0, 340, 340);
	ellipse(orbitRadius, 0, 280, 280);
	ellipse(orbitRadius, 0, 220, 220);
	ellipse(orbitRadius, 0, 160, 160);
	pop();
}

function drawMoon(){
  push();
	translate(orbitCenter.x, orbitCenter.y);
  rotate(orbitAngle);
  fill(moon)
  ellipse(-orbitRadius, 0, 50, 50);
	fill(moon2);
	ellipse(-orbitRadius, 0, 200, 200);
	ellipse(-orbitRadius, 0, 170, 170);
	ellipse(-orbitRadius, 0, 140, 140);
	ellipse(-orbitRadius, 0, 110, 110);
	ellipse(-orbitRadius, 0, 80, 80);
	pop();
}
