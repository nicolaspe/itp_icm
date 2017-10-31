// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 500

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 400;
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

// RESIZE EVENT!
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}

// set AudioContext to Tone.js
// THREE.setContext(Tone.context);


// LIGHTS
var lights = [];
lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[0].position.set(  200,  200,  200 );
lights[1].position.set( -200,  200, -200 );
lights[2].position.set(    0, -200, -100 );

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

// PLANE
let plane_geo = new THREE.PlaneGeometry(200, 20, 20, 20);
let plane_mat = new THREE.MeshPhongMaterial( {
	color: 0x190337,
	emissive: 0x6F59AF,
	side: THREE.DoubleSide,
	flatShading: true,
	// wireframe: true
} );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 3.1416/2;
plane.position.y = -70;
scene.add(plane);



/*
 * === MUSIC ===
 */

// ANALYSIS (+function) & POINTS
let fft = new Tone.FFT(128);
let waveform = new Tone.Waveform(1024);
var points = [];
let diam = 2;

function drawFFT(values){
	// if there are no points, create them!
	if(points.length <= 0){
		// set base geometry for all the spheres
		let point_geo = new THREE.SphereGeometry(diam, 12, 8);
		// create the points
		for (let i = 0; i < values.length; i++) {
			// set specific color
			let hue = (i/values.length)*120;
			let colorString = "hsl(" + hue +", 100%, 50%)"
			let point_mat = new THREE.MeshBasicMaterial({
				color: colorString
			});
			points[i] = new THREE.Mesh(point_geo, point_mat);
			// position each point in space!
			points[i].position.x = (i/values.length)*200 -100;
			points[i].position.y = plane.position.y;
			points[i].position.z = plane.position.z;
			scene.add(points[i]);
		}
	}

	// set the positions!
	for (let i = 0; i < values.length; i++) {
		// return values are bytes: range 0 - 255, centered on 0
		points[i].position.y = values[i] +128 -20;
	}
}

// PLAYER + button
// var player = new Tone.Player("apocalypsisaquarius.mp3").toMaster();
Tone.Buffer.on('load', loadPlayButton);

var playing = false;
var play_button = document.createElement("INPUT");
play_button.setAttribute("type", "button");
play_button.value = "Play";
play_button.disabled = true;
document.querySelector("#controls").appendChild(play_button);

var player = new Tone.Player({
	'url':'apocalypsisaquarius.mp3'
});
player.fan(fft).toMaster();
player.autostart = false;

// EVENT FUNCTIONS
function loadPlayButton() {
	play_button.disabled = false;
	console.log("audio ready");
}
play_button.addEventListener("click", function() {
	if(playing){
		player.stop();
		play_button.value = "Play";
	} else {
		player.start();
		play_button.value = "Stop";
	}
	playing = !playing;
});


// CONTROL
// using Interface.js
// var playButton = new Interface.Button({
// 	key : 32,
// 	type : "toggle",
// 	text : "Start",
// 	activeText : "Stop",
// 	start : function(){
// 		player.start();
// 	},
// 	end : function(){
// 		player.stop();
// 	}
// });






function animate() {
	requestAnimationFrame(animate);

	// get fft data and draw it!
	var fftValues = fft.getValue();
	drawFFT(fftValues);

	renderer.render(scene, camera);
}
animate();
