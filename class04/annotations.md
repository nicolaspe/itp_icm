# Annotations for assignment 4

This assignment is getting more and more complex


#### Centering objects on p5js/WebGL
```
// to draw a sphere centered on the mouse
function drawGround(){
	noStroke();
	fill(ground);

	// the WebGL environment draws the objects centered on width/2, height/2
	translate(mouseX-width/2, mouseY-height/2);
	sphere(100);
}
```

#### Testing directionalLight
The documentation for this function is not very precise.

You can use either colorMode: RGB or HSB. Then, the parameters are: `directionalLight(r, g, b, x, y, z)` or `directionalLight(h, s, b, x, y, z)`. In any case, the example I was making did not work, but the following one (found on p5.js code) did great.

```
function setup(){
  createCanvas(400, 400, WEBGL);
}
 function draw(){
  background(0);
  //move your mouse to change light direction
  var dirX = (mouseX / width - 0.5) *2;
  var dirY = (mouseY / height - 0.5) *(-2);
  directionalLight(250, 250, 250, dirX, dirY, 0.25);
  ambientMaterial(250);
  sphere(100);
}
```

From here I can see that dirX and dirY range from -1 to 1. The z "value" is also less than 1. This did not fix my sketch. It's main problem was that I was using `fill()` for the object. `ambientMaterial` was the command I needed to give it the corresponding color to the sphere. The zAxis also plays a huge role on how the light is rendered. I need to explore more on that part.

```
let planetRadius, ground;

function setup(){
	createCanvas(600, 600, WEBGL);
	colorMode(HSB, 360, 100, 100);

	// Environment
	planetRadius = 100;
	ground = color(30, 50, 100);
}

function draw(){
	background(0);

	var zAxis = map(mouseX, 0, width, -PI, PI);
	directionalLight(275, 88, 60, -1, 0, 0.25);
	directionalLight(0, 0, 50, 1, 0, zAxis);

	drawGround();
}

function drawGround(){
	// the ambient material gives it the corresponding color
	ambientMaterial(ground);
	noStroke();
	sphere(planetRadius);
}
```

Now, on to the robot. I created a class to have everything more organized. I remembered one thing I hate about p5js... it's damn notation to create object functions. I mean, who thought about `this.xyz = function()`?!

Anyway, the problem is that the rotation is not working. Using the exact same thing I used already for the 2D example is no good at all. Also, note the fact that for this I have to use `rotateZ()`, because you have 3 axis you can rotate! In the end, it was way mote simple than I expected: I wasn't considering that the canvas' starting position is in the middle of the screen, while the origin for the mouse is still the upped left corner. Adding those parameters to the rotation code, made everything work out perfectly!

```
function Robo(roboPos, roboDiam, roboColor, roboLight){
	this.pos = roboPos;
	this.diam = roboDiam;
	this.roboColor = roboColor;
	this.lightColor = roboLight;

	this.display = function(){
		noStroke();
		// calculate rotation
		// let mousePos = createVector(mouseX-width/2, mouseY-height/2);
		let mousePos = createVector(mouseX, mouseY);
		let robo2d = createVector(this.pos.x +width/2, this.pos.y +height/2);
		let roboAngle = -p5.Vector.sub(mousePos, robo2d).heading();

		// calculate vibration
		var roboVibe = frameCount/100;
		// change coordinates
		push();
		translate(this.pos.x, this.pos.y+(20*sin(roboVibe)), this.pos.z);
		rotateZ(roboAngle);
		// draw robo
		ambientMaterial(roboColor);
		sphere(this.diam);
		// draw eye
		translate(this.diam*.85, 0, 0);
		ambientMaterial(0, 0, 100);
		sphere(this.diam/4)
		// return coordinates
		pop();
	}
}
```

#### Point lights!

`pointLight()` work great with z=-0.5!
