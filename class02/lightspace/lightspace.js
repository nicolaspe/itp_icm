var t = 0;		// time keeper
var fR = 60;	// frameRate

// orbit variables
var orbitCenter, orbitAngle, orbitRadius;
// light robot variables
var roboDiam, roboPos, roboCol, roboStr, roboEye, roboAngle, roboLines, roboVibe;
// Environment variables
var ground, darkCol, darkAlpha, treeCol, trees, treeWind;
// auxiliary variables
var mPos;
// colours
var day, ray, sun, moon, sun2;

function setup(){
	createCanvas(640, 480);
	// setup basic things I need for everything to work correctly
	colorMode(HSB, 360, 100, 100, 100);
	noStroke();
	frameRate(fR);
	noiseSeed(random(10000));

	// Orbits and objects
	// orbitCenter = createVector(width/2, height*1.5+height*.2);
	orbitCenter = createVector(width/2, height);
	orbitRadius = height*0.8;
	orbitAngle = PI*1.3;
	sun = color(37, 64, 100, 100);
	sun2 = color(37, 64, 100, 15);
	moon = color(294, 18, 76, 100);
	moon2 = color(295, 18, 76, 5);

	// Lightrobot
	roboDiam = 40;
	roboPos = createVector(200, 200);
	roboCol = color(275, 88, 23, 100);
	roboStr = color(294, 18, 76, 80);
	roboEye = color(315, 5, 88, 100);
	roboLines = color(294, 18, 76, 100);
	roboVibe = 0.1; // robot vertical vibration aux variable

	// Environment
	ground = color(30, 50, 100, 40);
	darkAlpha = 100;
	darkCol = color(315, 5, 30, 38);
	treeCol = color(275, 88, 34, 100);
	trees = [];
	for (var i = 0; i < random(10,18); i++) {
		trees.push(createVector( random(0,width), random(height*0.81, height*0.98),	random(10,40) ));
	}
	treeWind = random(1000);
	// auxiliary
	mPos = createVector(mouseX, mouseY);

}

function draw(){
	background(242, 8, 100, 80);

	// basic calculations
	mPos = createVector(mouseX, mouseY);
	roboAngle = p5.Vector.sub(mPos, roboPos).heading();

	// display
  drawSun();
	drawMoon();
	drawGround();
	drawTrees();
	drawDarkness();
	drawRobo();

	// time passing
  t++;
	roboVibe += 0.01;
	treeWind += 0.01;
  orbitAngle += radians(1/5);
}

function drawSun(){
	// change coordinates
	push();
	translate(orbitCenter.x, orbitCenter.y);
  rotate(orbitAngle); // rotate angle
	// draw sun
  noStroke();
	fill(sun);
	ellipse(orbitRadius, 0, 100, 100);
	// draw overlapping circles
	fill(sun2);
	ellipse(orbitRadius, 0, 400, 400);
	ellipse(orbitRadius, 0, 340, 340);
	ellipse(orbitRadius, 0, 280, 280);
	ellipse(orbitRadius, 0, 220, 220);
	ellipse(orbitRadius, 0, 160, 160);
	// return coordinates
	pop();
}
function drawMoon(){
	// change coordinates
  push();
	translate(orbitCenter.x, orbitCenter.y);
  rotate(orbitAngle); // rotate angle
	// draw moon
	noStroke();
  fill(moon)
  ellipse(-orbitRadius, 0, 50, 50);
	// draw overlapping circles
	fill(moon2);
	ellipse(-orbitRadius, 0, 200, 200);
	ellipse(-orbitRadius, 0, 170, 170);
	ellipse(-orbitRadius, 0, 140, 140);
	ellipse(-orbitRadius, 0, 110, 110);
	ellipse(-orbitRadius, 0, 80, 80);
	// return coordinates
	pop();
}
function drawRobo(){
	// change coordinates
	push();
	translate(roboPos.x, roboPos.y +40*sin(roboVibe)/2);
	// calculate rotation
	rotate(roboAngle);
	// prepare colours
	fill(roboCol);
	stroke(roboStr);
	strokeWeight(4);
	// draw Lightrobot body
	ellipse(0, 0, roboDiam, roboDiam);
	// draw Lightrobot eye
	noStroke();
	fill(roboEye);
	ellipse(roboDiam/2, 0, roboDiam/5, roboDiam/3);
	// return to original coordinates
	pop();
}
function drawDarkness(){
	// change coordinates
	push();
	translate(roboPos.x, roboPos.y +40*sin(roboVibe)/2);
	// calculate rotation
	rotate(roboAngle);
	// prepare & calculate colours
	noStroke();
	darkAlpha = 50*sin(orbitAngle)+15;
	darkCol = color(315, 5, 27, darkAlpha);
	fill(darkCol);
	// draw
	arc(0, 0, 2*width, 2*width, PI/9, 17*PI/9);
	// return to coordinates
	pop();
}
function drawGround(){
	noStroke();
	fill(ground);
	// draw several layers of ground
	var aux = 0.8;
	for (var i = 0; i < 10; i++) {
		rect(0, height*aux, width, height);
		aux += 0.02;
	}
}
function drawTrees(){
	// draw trees
	for (var i = 0; i < trees.length; i++) {
		// translate and draw
		push();
		translate(trees[i].x, trees[i].y);
		stroke(treeCol);
		strokeWeight(1);
		line(0, 0, -1, -trees[i].z*0.67);
		// draw "leaves"
		strokeWeight(1);
		translate(0, -trees[i].z*0.66);
		rotate(noise(treeWind));
		for (var j = 0; j < 7; j++) {
			line(0,0, 0, -trees[i].z/2);
			rotate(0.14);
		}
		// return coordinates
		pop();
	}
}
