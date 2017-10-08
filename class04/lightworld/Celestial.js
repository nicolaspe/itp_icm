function Celestial(celDiam, celDepth, celPos, orbitPos, celColor, lightHue, textureImg){
	this.diam = celDiam;
	this.pos = createVector(0, -celPos, -celDepth);
	this.orbit = orbitPos;
	this.myColor = celColor;
	this.lightColor = lightHue;
	this.imgTexture = textureImg;

	this.display = function(orbitAngle){
		this.draw(orbitAngle);
		this.light(orbitAngle);
	}
	// draws the celestial object
	this.draw = function(orbitAngle){
		// change coordinates
		push();
		// go to orbit center
		translate(this.orbit.x, this.orbit.y, this.orbit.z);
		// rotate to the desired position and translate
		rotateZ(-orbitAngle);
		translate(this.pos.x, this.pos.y, this.pos.z);
		rotateX(orbitAngle);
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
	// renders the celestial light
	this.light = function(orbitAngle){
		// calculate light relative position
		let relY = cos(orbitAngle);
		let relX = sin(orbitAngle);
		let relPos = createVector(relX, relY, 0.25);
		// draw light
		directionalLight(this.lightColor,relPos);
	}
}
