# Lose yourself in your own sound space

For this assignment, we had to implement external sound or video into our sketches. I wanted to go with sound manipulation/analysis, because it is something I haven't done in coding. At the same time, I was getting very inspired when coding while listening to the [Soundtrack from Final Fantasy XV](https://www.youtube.com/watch?v=fNjoVHmJqzE) and how sometimes you just want to get lost on the music. I wanted to be able to literally *explore* the music, to walk on it's surface while it plays. And, as I'm also interested in learning threejs and [expanding what I learned last week](http://itp.nicolaspe.com/2017/10/a-3d-experience-about-experiences/), so I decided to create a visualization that creates a surface with the information of every instant of the FFT analysis.

TL;DR: [here](https://nicolaspe.github.io/itp_icm/class08/musicTrip/) is the final result!



## Experimenting with [Tone.js](https://tonejs.github.io/)

Tone.js is a wrapper library for the Web Audio API, created by [Yotam Mann](https://github.com/tambien). It has many functions I needed (mainly, the FFT analysis), so I decided to give it a try. Sadly, the documentation is not as good as the Processing/p5.js ones, so I had to dedicate far more work into figuring out even some little details.

First of all, I needed to create a player. This wasn't difficult at all, and made me very hopeful about a future where I could get this done very quickly... ha!
```
var player = new Tone.Player({
	"url" : "./audio/audioFile.[mp3|ogg]"
});
```

### How the !%#%$ you analyze it?!
Following the logic of pure data and Max MSP, I knew I had to "feed" the player to a FFT analysis. The problem was... HOW?!?! The [documentation](https://tonejs.github.io/docs/r11/FFT) tells you how to create the FFT, but there are no clues of how to get it to work! Luckily, I have learned something in these past months, so I went to the repository, dug through the examples until I found the [analysis](https://github.com/Tonejs/Tone.js/blob/dev/examples/analysis.html) one to get this bit of wonderful code:
```
var fft = new Tone.FFT(512);
var waveform = new Tone.Waveform(1024); // <- you can do this as well
player.fan(fft, waveform)
player.toMaster();
```

The `.fan(fft)` bit is the magic one! And `.toMaster()` is what connects the player to the *Audio Context*, without it, no sound would come out. Then, to get the values `fft.getValue()` returns an array, couldn't be easier.

### Callback for a player
I already had the player and FFT set up. But there were some interactivity issues I had to address. I hate it when audio starts autoplaying, so a play button was essential. But, you shouldn't be able to press the button before the audio is loaded, so I had to setup the callback function to enable the button when the moment was the one.

I had no idea how to do this, and the [documentation](https://tonejs.github.io/docs/r11/Player) was only half useful. They recommended using the `Tone.Buffer.on(‘load’)` instead of setting up the callback on the Player. The reason is that you would need to set a load function on each one of the players, whereas the alternative they give, waits until all of them have finished loading. The downside is that... the function is not well written. And that was only a half of my problems.

Turns out that setting this up was a pain, I don't know why. Maybe it had to do with the order I had my code written, maybe it has to do with code gnomes, or whatever... I was about to submit an issue on the GitHub repository, for which I was cleaning my code (and realizing other things I have no idea how to do), when everything started magically working! So, anyway, this code, in this particular order, worked and I'm not touching it again, EVER:
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
The next part was creating the immersive experience. I wanted to make a growing surface with the different FFT values. I knew it had to do with adding new vertex to the Mesh geometry, but I needed an intermediate step first. To see if I was able to get the values, preserve them and create a mock surface, it was better to use the small spheres I used for the last assignment. After that, moving to a custom surface would be easier.

### Skydome!
But first, I needed to create the illusion of being in a big space, not in the void. [Thanks to this  tutorial](https://stackoverflow.com/questions/32233805/im-new-to-threejs-how-to-create-a-sky-dome) it was extremely simple. After that, it was just an issue of playing with different images and seeing which one wrapped nicely, as some clearly showed where the images were stitched together. I ended up using the [ESO Milky Way high resolution image]( https://www.eso.org/public/usa/images/eso0932a/) (which looks AWESOME!).

### PointLight's parameters
color, intensity, distance, decay... just played with these

### Shaders?
[maybe](https://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/) [later](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/) (though it seems really fun, matrix transformations are not that hard for me to understand (see mom? civil engineering was useful in my artistic life in the end!))

### First, let's accumulate the points!


Remove objects from a scene: the following DIDN'T WORK
```
function removePoints(){
	for (let i = 0; i < points.length; i++) {
		scene.remove( scene.getObjectById(i+100) );
	}
	points = [];
	console.log("points cleaned");
}
```

[Constrain](https://stackoverflow.com/questions/5842747/how-can-i-use-javascript-to-limit-a-number-between-a-min-max-value)

[set interval](https://www.w3schools.com/jsref/met_win_setinterval.asp)

### Custom geometries
https://threejs.org/docs/#api/core/Geometry



## Extra!
- [Interface.js](http://charlie-roberts.com/interface/)
- ThreeJs set audio context [link](https://threejs.org/docs/#api/audio/AudioContext)
- VR [example](https://github.com/mrdoob/three.js/blob/dev/examples/webvr_cubes.html)
-
