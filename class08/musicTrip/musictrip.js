// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 500

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, wid/hei, 0.1, 10000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.x = -622.31;
camera.position.y =  107.65;
camera.position.z =  -22.73;
camera.rotation.x = -0.959;
camera.rotation.y = -1.385;
camera.rotation.z = -0.950;
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


// LIGHT
var light = new THREE.PointLight( 0xffffff, 1, 6000, 2 );
light.position.set(1000, 0, 0);
scene.add(light);

// SKYDOME
// https://www.eso.org/public/usa/images/eso0932a/
var skyGeo = new THREE.SphereGeometry(2000, 25, 25);
var loader = new THREE.TextureLoader();
var texture = loader.load("eso0932a_sphere.jpg");
var skyMat = new THREE.MeshPhongMaterial({
	map: texture,
});
var skyDome = new THREE.Mesh(skyGeo, skyMat);
skyDome.material.side = THREE.BackSide;
scene.add(skyDome);



/*
 * === MUSIC ===
 */

// ANALYSIS (+function) & POINTS
let fft = new Tone.FFT(64);
var points = [];
let diam = 2;
let disp = diam*4;

function drawFFT(){
	let values = fft.getValue();
	// only draw if it's playing
	if (playing) {
		// if there are points already, displace them!
		let curr_len = points.length;
		if (curr_len > 0) {
			displacePoints();
		}

		// do nothing if the fft value is too low!
		if (Math.max(values) <= -300) { }
		else {
			// create the new points
			// set base geometry for all the spheres
			let point_geo = new THREE.SphereGeometry(diam, 12, 8);
			for (let i = 0; i < values.length; i++) {
				let j = curr_len +i;
				// set specific color
				let hue = (i/values.length)*120 +200;
				let lum = (values[i]+128)/256 *50 +50;
				lum = Math.min( Math.max( Math.round(lum), 1), 100);
				let colorString = "hsl(" +hue +", 100%, " +lum +"%)"
				let point_mat = new THREE.MeshBasicMaterial({
					color: colorString
				});
				points[j] = new THREE.Mesh(point_geo, point_mat);
				// position each point in space!
				points[j].position.x = 0;
				points[j].position.y = values[i] +128 -20;
				points[j].position.z = (i/values.length)*200 -100;

				scene.add(points[j]);
			}
		}
	}
}

function displacePoints(){
	for (var i = 0; i < points.length; i++) {
		points[i].position.x -= disp;
	}
}

// PLAYER + button
/* set main Buffer callback function */
Tone.Buffer.on('load', loadPlayButton);
/* create the button */
var playing = false;
var play_button = document.createElement("INPUT");
play_button.setAttribute("type", "button");
play_button.value = "Play";
play_button.disabled = true;
document.querySelector("#controls").appendChild(play_button);
/* create the player */
var player = new Tone.Player({
	'url':'apocalypsisaquarius.mp3'
});
player.fan(fft).toMaster();
player.autostart = false;

// EVENT FUNCTIONS
function loadPlayButton() {
	// enable the button
	play_button.disabled = false;
	console.log("audio ready");
}

play_button.addEventListener("click", function() {
	if(playing){
		// stop the player
		player.stop();
		play_button.value = "Play";
	} else {
		player.start();
		play_button.value = "Stop";
	}
	playing = !playing;
});


/*
 * == ANIMATION ==
 */

// interval function : call drawFFT
window.setInterval(drawFFT, 50);

function animate() {
	requestAnimationFrame(animate);

	// get fft data and draw it!
	// let fftValues = fft.getValue();
	// drawFFT(fftValues);

	renderer.render(scene, camera);
}
animate();
