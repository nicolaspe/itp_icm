// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 400

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 500;
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();


// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( { color: 0xAF99EF, wireframe: true } );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 0.785;
plane.rotation.y = 0.185;
scene.add(plane);


// DATA
var data_women = d3.csv("data/women.csv", function(data) {
	data_women = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});
var data_men = d3.csv("data/women.csv", function(data) {
	data_women = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});


// TEXT
var labelContainer = document.querySelector("#label");


// RESIZE EVENT!
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	hei = 400;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}


function animate() {
	requestAnimationFrame(animate);

	// change text according to camera
	// labelContainer.textContent = ;

	renderer.render(scene, camera);
}
animate();