// CANVAS VARIABLES
var wid = window.innerWidth;
var hei = 400

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 500;
var container = document.querySelector('#sketch');
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



function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}
animate();
