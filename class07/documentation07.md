# A 3D experience about experiences

## Learning [three.js](https://threejs.org/)
The [documentation](https://threejs.org/) is good, and the examples on the web make it easy enough to learn how to use it, at least for the basic stuff.

#### Setting it up
To set the three.js canvas, we need to set up the **scene**, **camera** and **renderer**. In this example, I also set a **container** in order to specify where in the HTML file I'll add the canvas.

The scene is what holds all the objects (they need to be added to the scene after creation, otherwise, they won't appear!). The camera is what is used for the view and decide what is being rendered. The inputs it needs are: field of view (fov), aspect (ratio between width and height), near and far. These last two variables decide the limits on how near and far objects are rendered. Anything outside of that, will not be seen. The renderer is what calculates and draws everything, so that is what need the values of width and height of the canvas.
```
var container = document.querySelector('#sketch');
var fov = 30;
var wid = document.body.clientWidth;
var hei = 400;
var near = 0.1;
var far  = 1000;

var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(fov, wid/hei, near, far);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
container.appendChild(renderer.domElement);
```

It is a good idea to add an event listener to resize the canvas if the window is resized. For this, we need to update the width, height, aspect ratio and the camera's projection matrix.
```
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	hei = 400;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}
```

Finally, we actually need it to "play", "draw", "update", "animate", or however you want to call it. For this, create a function and recursively call it while also rendering the scene. Here, we're creating a simple animate function, we render the scene, and request the next frame by calling this function once again. After writing the function, we call it for the first time to get things running.
```
function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
animate();
```

#### Creating an object!
To create an object, two things are needed: a geometry and a mesh material. three.js comes with a bunch of predefined geometries (cubes, spheres, planes, etc), and materials (basic, phong, etc). We can also modify the object's position and rotation in space. Finally, we have to add it to the scene for it to be shown.
```
var pWidth  = 200;
var pHeight = 150;
var pWidElem = 20;
var pHeiElem = 20;
var plane_geo = new THREE.PlaneGeometry(pWidth, pHeight, pWidElem, pHeiElem);
var plane_mat = new THREE.MeshBasicMaterial( {
	color: 0xAF99EF,
	wireframe: true							// I only want the wires to show
} );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 3.1416/2;	// = half Pi
plane.position.y = -70;
plane.position.z = -100;
scene.add(plane);
```

#### Adding control!
From the examples in the documentation, I realized there's a three.js library called **Orbit Controls**, which lets you control the camera's rotation (mouse drag) and position (arrow keys and mouse scroll). So, besides adding that library to the HTML file, just add the following code et voila!
```
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();
```




## Combining with d3
To import the data, I used [d3](https://d3js.org/), a library specialized on data.

When you get the data the first time, everything will be a String. In order to transform this to a number, just append the following function to the import instance.
```
var data_women = d3.csv("data/women.csv", function(data) {
	data_women = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});
```


## Combining both to show information!

#### Adding buttons from the js file + Event listeners
Now, in order to select the data shown on the canvas, we needed to have some buttons for the users. Even though we can create the buttons directly on the HTML file, I prefer having them on the js file, as this lets me work and edit only one file and separate the different aspects from the project.

Thanks to the programmer's best friend, [StackOverflow](https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function), coding this became really easy.

```
var button = document.createElement("INPUT");
button.setAttribute("type", "button");
button.value = "Category 1";
button.addEventListener("click", function(){
	changeStatus(button.value);
	dataShow();
});
document.querySelector("#controls").appendChild(button);
```

#### Issues
I did run into some issues when coding this assignment:

- You need to refresh the camera when changing the fov, otherwise the renderer does not take it into account. Update the camera with `camera.updateProjectionMatrix();`
- You can use [color mode HSL](https://threejs.org/docs/#api/math/Color), just specify it when creating the color: `var color = new THREE.Color("hsl(0, 100%, 50%)");`
- When [replacing a color](https://stackoverflow.com/questions/14181631/changing-color-of-cube-in-three-js) you cannot just access the property, you need to use it's set function: `cube.material.color.setHex(0xffffff);`
