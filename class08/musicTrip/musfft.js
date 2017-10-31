var sound;
var fft;

function preload(){
	sound = loadSound("apocalypsisaquarius.mp3");
}

function setup(){
	createCanvas(100, 100);
	fft = new p5.FFT();
	sound.amp(0.2);
	sound.loop();
}

function draw(){
	background(0);

	var spectrum = fft.analyze();

	noStroke();
	fill(0, 255, 0);

	for (var i = 0; i < spectrum.length; i++) {
		var x = map(i, 0, spectrum.length, 0, width);
		var h = -height + map(spectrum[i], 0, 255, height, 0);
		rect(x, height, width/spectrum.length, h);
	}
}
