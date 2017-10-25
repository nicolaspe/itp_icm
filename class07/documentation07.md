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

#### Adding control!

#### Adding buttons from the js file + Event listeners
[Link](https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function)

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
I did run into some issues when using this:

- You need to refresh the camera when changing the fov, otherwise it does not re-render it taking that into account. Update the camera with `camera.updateProjectionMatrix();`
- You can use [color mode HSL](https://threejs.org/docs/#api/math/Color), just specify it when creating the color: `var color = new THREE.Color("hsl(0, 100%, 50%)");`
- When [replacing a color](https://stackoverflow.com/questions/14181631/changing-color-of-cube-in-three-js) you cannot just access the property, you need to use it's set function: `cube.material.color.setHex(0xffffff);`



## Combining with d3
When you get the data the first time, everything will be a String. In order to transform this to a number, just append the following function to the import instance.
```
var data_women = d3.csv("data/women.csv", function(data) {
	data_women = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});
```

## Creating [Tone.js](https://tonejs.github.io/)
It is a library by [Yotam Mann](https://github.com/tambien)

#### HOW THE !@#$% YOU CONNECT IT?!
I had to go to the examples, find the [analysis](https://github.com/Tonejs/Tone.js/blob/dev/examples/analysis.html) one to get this code:
```
var fft = new Tone.FFT(1024);
var waveform = new Tone.Waveform(1024);

var player = new Tone.Player({
	"url" : "./audio/audioFile.[mp3|ogg]",
	"loop" : true
}).fan(fft, waveform).toMaster();
```

The `.fan(fft)` was the bit I *thought* could work, but I was not sure. Luckily, it was!

## Extra!
- [Interface.js](http://charlie-roberts.com/interface/)
