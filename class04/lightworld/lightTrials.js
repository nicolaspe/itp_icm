function setup(){
  createCanvas(400, 400, WEBGL);
}
 function draw(){
  background(0);
  //move your mouse to change light direction
  var dirX = (mouseX / width - 0.5) *2;
  var dirY = (mouseY / height - 0.5) *(-2);
  directionalLight(250, 0, 0, dirX, dirY, 1);
	var zAxis = map(mouseX, 0, width, -PI, PI);
	// pointLight(0, 0, 250, dirX, dirY, -0.6);

  ambientMaterial(250);
  sphere(100);
	translate(0, 200);
	sphere(100);
}
