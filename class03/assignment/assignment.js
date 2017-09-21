var t = 0;
var fR = 60;

// square variables
var squares, sqRadius;
// auxiliary squares
var sq1, sq2, sq3, sq4;
// environment variables
var angle = 0;

function setup(){
	createCanvas(640, 480);

	rectMode(CENTER);
	noFill();
	strokeWeight(2);
	stroke(255, 255, 255, 60);

	// variable initialization
	squares = []; // [x, y, rotation, radius]
	sqRadius = 50;

  sq1 = [100, 100, 0.2, sqRadius];
  sq2 = [200, 100, 0.3, sqRadius+10];
  sq3 = [300, 100, 0.4, sqRadius+20];
  sq4 = [400, 100, 0.5, sqRadius+30];

  squares = [sq1, sq2, sq3, sq4];
}

function draw(){
	background(0);

	shrinkSquares();
	drawSquares();

	angle += radians(1/5);
}

// This function draws every square contained in the "squares" array
function drawSquares(){
	for (var i = 0; i < squares.length; i++) {
			push();
			translate(squares[i][0], squares[i][1]);
			rotate(squares[i][2]);
			rect(0, 0, squares[i][3], squares[i][3]);
			pop();
	}
}
// This function shrinks the squares and removes them from the array
function shrinkSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i][3] -= 0.1;
		if(squares[i][3] <= 0){
			squares.splice(i, 1);
		}
	}
}
