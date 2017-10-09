# A "light" problem 2.0

This assignment is about upgrading a previous assignment using functions. As my previous assignments already do (and the first one is not really worth it), the upgrade I want to try is using WebGL to get to use the `directionalLight` and `pointLight` functions... and this was not as easy as I expected. **WARNING**: Lots of documentation and notes ahead!

TL;DR: [here is the final sketch](https://nicolaspe.github.io/itp_icm/class04/lightworld/).



### Centering objects on p5.js/WebGL

3D WebGL objects don't ask for a position to be drawn, the default location is `(width/2, height/2)`. But the canvas keeps it's `(0, 0)` on the upper left corner! So, if we want to draw something on the mouse position, we need to do some maths:

```
// to draw a sphere centered on the mouse
function drawSphere(){
	noStroke();
	fill(220, 10, 10);

	// the WebGL environment draws the objects centered on width/2, height/2
	translate(mouseX-width/2, mouseY-height/2);
	sphere(100);
}
```



### Testing the `directionalLight()`
The documentation for this function is not very precise. I'll try to be as specific as I can. The code examples found in the p5.js file itself were much more useful.

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

From this, I can see that dirX and dirY range from -1 to 1. The z "value" is also less than 1. This did not fix my sketch. It's main problem was that I was using `fill()` for the object (later I found the corresponding [*material* properties](https://p5js.org/examples/3d-materials.html) you can actually use en WebGL). `ambientMaterial` was the command I needed to give it the corresponding color to the sphere. The zAxis also plays a huge role on how the light is rendered. I'll need to explore more on that part.

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



### Point lights!

I was glad to find there are [many types of lights](https://p5js.org/reference/#group-Lights, Camera) you can use. Saldy, they did not work as I expected them.

The first issue was trying to get the `pointLight()` to work. Again, I used the documentation from the p5.js file itself, which while useful, was not doing what it is supposed to do. Both, `directionalLight()` and `pointLight()` see the world the following way:

```
// -1,1 -------- 1,1
//   |            |
//   |            |
//   |            |
// -1,-1---------1,-1
```

I made a small sketch to try the lights -apart my main one-, but this type of light did not work as advertised. This was getting increasingly frustrating. Suddenly, while changing the html file, I realized I was using a p5.min.js file (which I got from the web editor), while I was using the documentation from a p5.js file (an older version gotten from the IDE package). I changed the file and... that was it! This specific function does not work with p5.min.js file. Besides fixing my own sketch, I uploaded an [issue](https://github.com/processing/p5.js/issues/2251) to the [p5.js Github page](https://github.com/processing/p5.js/) and made two example sites ([working](https://nicolaspe.github.io/itp_icm/class04/lightworld/trials.html) and [not-working](https://nicolaspe.github.io/itp_icm/class04/lightworld/trials_min.html)) to compare the different versions. Hopefully, there will not be major downsides of using an older p5.js version file.

Outside that issue, everything went pretty well. I started experimenting with different z values and liked how it looked with `z=-0.5`.



### Drawing the Robot!

Now, on to the robot. I created a class to have everything more organized. I remembered one thing I don't really like about p5js... it's damn notation to create object functions. I mean, who thought about `this.xyz = function()`?!

So anyway, the problem is that the rotation was not working as I wanted. Using the exact same code I used already for the 2D example was no good at all. Also, note the fact that for this I have to use `rotateZ()`, because now you have 3 different axis you can rotate! In the end, it was way mote simple than I expected: I wasn't considering the first point I wrote about: the canvas' starting position is in the middle of the screen, while the origin for the mouse is still the upped left corner. Adding those parameters to the rotation code, made everything work out perfectly!

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


### Textures (why?! because I hate myself)

As if everything else didn't take long enough, I tried to use textures for some objects. It took me a while to modify the *Celestial* class (in charge of the Sun and Moon, of course) and realize I need to load the Image first, and THEN pass it as an attribute. Passing a String with the file path does not work.

```
	moonColor = color(294, 18, 60, 100);
	moonLight = color(295, 18, 30, 5);
	moonTexture = loadImage("moonTexture2.jpg");
	moon = new Celestial(100, 350, height*1.8, orbitPos, moonColor, moonLight, moonTexture);

function Celestial(celDiam, celDepth, celPos, orbitPos, celColor, lightHue, textureImg){
	this.draw = function(orbitAngle){
		// change coordinates
		push();
		// go to orbit center
		translate(this.orbit.x, this.orbit.y, this.orbit.z);
		// rotate to the desired position and translate
		rotateZ(-orbitAngle);
		translate(this.pos.x, this.pos.y, this.pos.z);
		rotateY(orbitAngle);	// some nice object rotation
		// color and draw
		if(textureImg != ""){
			texture(this.imgTexture);
		} else {
			basicMaterial(this.myColor);
		}
		sphere(this.diam);
		// return coordinates
		pop();
	}
}
```

This looks nice, but... it has some weird glitches when too many lights are in play. I like how it looks, but I'll have to fix this if I want to really use this in the future.

I also wanted to have a nice galaxy in the background. As this is a 3D environment, you cannot just export the image to the background! A workaround is creating a plane object, placing it behind everything else, and giving that the desired texture. Sadly, all these processes proved to be too much for the sketch. It started running slower than a river of crunchy peanut butter at room temperature, so I had to drop that.



### Conclusions
The 3D WebGL graphics of p5.js offer some very nice tools, but I feel they are still underdeveloped. I want to be able to create a point light that actually starts from a specific point in the sketch. Also, I need the option to make a texture like a normal material, that is, a texture that is not affected by lights and shadows.

Next time, I'll just start using three.js  


[Here is the repository](https://github.com/nicolaspe/itp_icm/tree/gh-pages/class04/lightworld) with all the code and the [final result is here](https://nicolaspe.github.io/itp_icm/class04/lightworld).
