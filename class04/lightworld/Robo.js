function Robo(roboPos, roboDiam, roboColor, lightHue){
	this.pos = roboPos;
	this.diam = roboDiam;
	this.roboColor = roboColor;
	this.lightColor = lightHue;
	this.roboAngle = 0;

	this.display = function(lightInt){
		this.draw();
		this.light(lightInt);
	}

	this.draw = function(){
		noStroke();
		colorMode(HSB, 360, 100, 100);
		// calculate rotation
		// let mousePos = createVector(mouseX-width/2, mouseY-height/2);
		let mousePos = createVector(mouseX, mouseY);
		let robo2d = createVector(this.pos.x +width/2, this.pos.y +height/2);
		let roboVector = p5.Vector.sub(mousePos, robo2d);
		roboAngle = -roboVector.heading();
		// console.log(roboAngle);

		// calculate vibration
		let roboVibe = frameCount/100;

		// change coordinates
		push();
		translate(this.pos.x, this.pos.y+(20*sin(roboVibe)), this.pos.z);
		rotateZ(roboAngle);
		// draw robo
		specularMaterial(roboColor);
		sphere(this.diam);
		// draw eye
		translate(this.diam*.85, 0, 0);
		basicMaterial(0, 0, 100);
		sphere(this.diam/4)
		// return coordinates
		pop();
	}

	this.light = function(lightInt){
		// draw light
		// calculate light relative position
		let relX =  map(mouseX, 20, width, -1, 1);
		let relPos = createVector(relX, 0.5, -0.4);
		// calculate light brightness according to external light and dim the light if the robot angle goes beyond boundaries (is no longer looking at the ground) (-0.3, -2.5)
		let bright = 85 - lightInt;
		let roboDegree = degrees(roboAngle);
		if(roboDegree < -180 || roboDegree > 0){ // too far, lights off
			bright = 0;
		} else if (roboDegree < -150) { // dim the lights 1
			bright *= (roboDegree+180)/30;
		} else if (roboDegree > -30) { // dim the lights 2
			bright *= -(roboDegree)/30;
		}
		let liiight = color(this.lightColor, 25, bright);
		pointLight(liiight,relPos);
	}
}
