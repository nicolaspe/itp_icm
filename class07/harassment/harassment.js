// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 400

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 500;
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();


// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( {
	color: 0xAF99EF,
	wireframe: true
} );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 3.1416/2;
plane.position.y = -70;
scene.add(plane);


// DATA
var data_women = d3.csv("data/women.csv", function(data) {
	data_women = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});
var data_men = d3.csv("data/men.csv", function(data) {
	data_men = data.map(function(d) {
		return [d["Type"], +d["None"], +d["year"], +d["month"], +d["week"], +d["day"]];
	});
});



// TEXT & BUTTON & SHOW DATA
var labelContainer = document.querySelector("#label");
var caseLabel = "Verbal";

var vButton = document.createElement("INPUT");
vButton.setAttribute("type", "button");
vButton.value = "Verbal";
vButton.addEventListener("click", function(){
	caseLabel = vButton.value;
	dataShow();
});
document.querySelector("#controls").appendChild(vButton);

var pButton = document.createElement("INPUT");
pButton.setAttribute("type", "button");
pButton.value = "Physical";
pButton.addEventListener("click", function(){
	caseLabel = pButton.value;
	dataShow();
});
document.querySelector("#controls").appendChild(pButton);

var aButton = document.createElement("INPUT");
aButton.setAttribute("type", "button");
aButton.value = "Audiovisual record";
aButton.addEventListener("click", function(){
	caseLabel = aButton.value;
	dataShow();
});
document.querySelector("#controls").appendChild(aButton);

var sButton = document.createElement("INPUT");
sButton.setAttribute("type", "button");
sButton.value = "Serious";
sButton.addEventListener("click", function(){
	caseLabel = sButton.value;
	dataShow();
});
document.querySelector("#controls").appendChild(sButton);


// CASE SELECTOR
function selectCase(){
	let num = 0;
	if (caseLabel == "Verbal") {
		num = 0;
	} else if (caseLabel == "Physical") {
		num = 1;
	} else if (caseLabel == "Audiovisual record") {
		num = 2;
	} else {
		num = 3;
	}
	return num;
}

// POINTS
var points_w = [];
var points_m = [];
let colorString = [0x522956, 0x841864, 0xF4D3DA, 0xFD7E23];
let point_geo = new THREE.SphereGeometry(1, 12, 8);
// WOMEN create the points
for (let i = 0; i < 100; i++) {
	let col = 0xffffff;

	let point_mat = new THREE.MeshBasicMaterial({
		color: col
	});
	points_w[i] = new THREE.Mesh(point_geo, point_mat);
	// position each point in space!
	points_w[i].position.x = i/100 *200 -100;
	points_w[i].position.y = plane.position.y+100;
	points_w[i].position.z = plane.position.z;
	scene.add(points_w[i]);
}
// MEN create the points
for (let i = 0; i < 100; i++) {
	let col = 0xffffff;

	let point_mat = new THREE.MeshBasicMaterial({
		color: col
	});
	points_m[i] = new THREE.Mesh(point_geo, point_mat);
	// position each point in space!
	points_m[i].position.x = i/100 *200 -100;
	points_m[i].position.y = plane.position.y+60;
	points_m[i].position.z = plane.position.z;
	scene.add(points_m[i]);
}

function dataShow() {
	var caseIndex = selectCase();
	let point_mat;

	let col = 0xffffff;
	// WOMEN choose intensity case
	let accum_w = [];
	accum_w[0] = data_women[caseIndex][1];
	accum_w[1] = accum_w[0] + data_women[caseIndex][2];
	accum_w[2] = accum_w[1] + data_women[caseIndex][3];
	for (var i = 0; i < 100; i++) {
		if (i < accum_w[0]) {
			col = colorString[0];
		} else if (i < accum_w[1]) {
			col = colorString[1];
		} else if (i < accum_w[2]) {
			col = colorString[2];
		} else {
			col = colorString[3];
		}
		// point_mat = new THREE.MeshBasicMaterial({ color: col });
		points_w[i].material.color.setHex(col);
	}

	// MEN choose intensity case
	let accum_m = [];
	accum_m[0] = data_men[caseIndex][1];
	accum_m[1] = accum_m[0] + data_men[caseIndex][2];
	accum_m[2] = accum_m[1] + data_men[caseIndex][3];
	for (var i = 0; i < 100; i++) {
		if (i < accum_m[0]) {
			col = colorString[0];
		} else if (i < accum_m[1]) {
			col = colorString[1];
		} else if (i < accum_m[2]) {
			col = colorString[2];
		} else {
			col = colorString[3];
		}
		// point_mat = new THREE.MeshBasicMaterial({ color: col });
		points_m[i].material.color.setHex(col);
	}
}

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
