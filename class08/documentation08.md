
## Creating [Tone.js](https://tonejs.github.io/)
It is a library by [Yotam Mann](https://github.com/tambien)

### HOW THE !@#$% YOU CONNECT IT?!
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

ThreeJs set audio context [link](https://threejs.org/docs/#api/audio/AudioContext)


### Callback for player
It was a pain in the a$$, dunno why. Maybe it had to do with the order I had my code written, maybe it has to do with code gnomes, whatever... This code, in this particular order, worked:
```
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
	'url':'music.mp3'
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
```



## Further exploring three.js

### Skydome!
[Thanks to this simple tutorial](https://stackoverflow.com/questions/32233805/im-new-to-threejs-how-to-create-a-sky-dome)

### PointLight's parameters
color, intensity, distance, decay... just played with these

### Shaders?
[maybe](https://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/) [later](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/) (though it seems really fun, matrix transformations are not that hard for me to understand (see mom? civil engineering was useful in my artistic life in the end!))

### First, let's accumulate the points!

### Custom geometries
https://threejs.org/docs/#api/core/Geometry


## Extra!
- [Interface.js](http://charlie-roberts.com/interface/)
