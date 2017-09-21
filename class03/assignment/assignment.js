var t = 0;
var fR = 60;

// square variables
var squares, sqRadius;
// environment variables
var angle = 0;

function setup(){
	createCanvas(640, 480);

	rectMode(CENTER);
	noFill();
	stroke(255, 255, 255, 60);

	// variable initialization
	squares = []; // [x, y, rotation, radius]
	sqRadius = 50;
}

function draw(){
	background(0);

	drawSquares();

	angle += radians(1/5);
}


function drawSquares(){
	for (var i = 0; i < squares.length; i++) {
		push();
		translate(squares[i,1], squares[i,2]);
		rotate(squares[i,3]);
		rect(0, 0, squares[i,4], squares[i,4]);
		pop();
	}
}
