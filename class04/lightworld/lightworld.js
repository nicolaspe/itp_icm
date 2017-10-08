// Objects!
let robo;
// Environment variables
let backImg;
let orbitAngle, orbitRadius
let planetRadius, ground;
let sunColor, sunLight;
let moonColor, moonLight, moonTexture;

function setup(){
	createCanvas(800, 600, WEBGL);
	colorMode(HSB, 360, 100, 100);
	frameRate(60);

	// Robo initialization
	let roboPos = createVector(-200, 0, 0.6);
	let roboDiam = 40;
	let roboCol = color(275, 88, 23);
	let roboLight = 270;
	robo = new Robo(roboPos, roboDiam, roboCol, roboLight);

	// Environment
	backImg = loadImage("galaxy.jpg");
	orbitAngle = 0;
	orbitPos = createVector(0, height*1.2, 0);
	sunColor = color(37, 64, 100, 100);
	sunLight = color(37, 64, 100, 15);
	sun = new Celestial(200, 400, height*2, orbitPos, sunColor, sunLight, "");
	moonColor = color(294, 18, 60, 100);
	moonLight = color(295, 18, 30, 5);
	moonTexture = loadImage("moonTexture2.jpg");
	moon = new Celestial(100, 350, height*1.8, orbitPos, moonColor, moonLight, moonTexture);
	planetRadius = height*3;
	ground = color(30, 50, 100);
}

function draw(){
	// background(0);

	// calculate variables
	orbitAngle = radians( (frameCount/5)%360);
	var daynight = map(cos(orbitAngle), -1, 1, 10, 90);

	background(242, 8, daynight);

	// lights
	// push();
	// // tint(255, 100-daynight);
	// texture(backImg);
	// translate(0, 0, -1000);
	// plane(2*width, 2*height);
	// pop();

	// draw everything!
	drawGround();
	sun.display(orbitAngle);
	moon.display(orbitAngle+PI);
	robo.display(daynight);
}

function drawGround(){
	// the ambient material gives it the corresponding color
	ambientMaterial(ground);
	// specularMaterial(ground);
	noStroke();
	// change coordinates
	// WebGL centers the objects on width/2, height/2. We have to take that into account when choosing a new position
	push();
	translate(0, planetRadius*(9/8), 0);
	sphere(planetRadius, 48, 48);
	pop();
}
