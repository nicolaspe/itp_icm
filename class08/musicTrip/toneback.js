
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
player.toMaster();
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
