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

The `.fan(fft)` bit is the magic one! And `.toMaster()` is what connects the player to the *Audio Context*, without it, no sound would come out. Then, to get the values `fft.getValue()` returns an array, couldn't be easier. Finally, these values range from -891.05 (-Infinity, when there's no sound) to 0.00 (at least, I think so... the maximum value I got was -17.45, but it makes sense to cap at 0).

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
One of the problems I ran into with the Skydome was the material property it has. From the tutorial, I copied the `MeshPhongMaterial`, which simulates [shiny highlighted surfaces](https://threejs.org/docs/#api/materials/MeshPhongMaterial), so having 3 sources of light created just a white interior.

I got rid of two lights and gave the last one a new position. At the same time, I wanted to know more about the [parameters](https://threejs.org/docs/#api/lights/PointLight) it could have, specially the distance it could reach. The constructor takes parameters for `color, intensity, distance, decay`, so I just played with these until I found something I liked.

Another slight problem I ran into, was setting up the camera and renderer. The first sphere's size was 5000, but the renderer's `far` property was set to 1000, obviously I could not see anything, but was very easily fixed.

### Let's accumulate the points!
The first step towards my desired sound surfaces was accumulating the points of the FFT analysis. I couldn't just create and add the points to the array and scene, as I need to constantly displace the existing ones to make space for the new ones.

The first thing was to displace the existing points. Then, create the new spheres, varying their hue and luminosity according to their axis position and intensity value. The first one was quite simple (and successful), but the luminosity needs to be [constrained](https://stackoverflow.com/questions/5842747/how-can-i-use-javascript-to-limit-a-number-between-a-min-max-value) and is not working as expected (at least it doesn't send any errors!). I decided to place the points along the z-axis, just because the skydome looks way better in that orientation.
```
if (points.length > 0) {
	displacePoints();
}

// set base geometry for the new spheres
let point_geo = new THREE.SphereGeometry(diam, 12, 8);
for (let i = 0; i < values.length; i++) {
	let j = points.length +i;
	// set specific color
	let hue = (i/values.length)*120 +200;
	let lum = (values[i]+128)/256 *50 +50;
	lum = Math.min( Math.max( Math.round(lum), 1), 100);	// constrain
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
```

Just using this code overloads the computer quite fast. Even when setting the camera so that the points get displaced to the "back" and you don't see them anymore after a while, making new points every draw cycle is too much. I needed to call that function every X amount of time, in a certain... interval. Luckily, javascrip has a function called `[setInterval()](https://www.w3schools.com/jsref/met_win_setinterval.asp)`! Just by giving it the draw function I had already created and the time interval (in milliseconds) everything was perfectly set up 😃.
```
window.setInterval(drawFFT, 50);
```

### Removing the points
Another way to remove some load from the computer is actually removing the elements from the array and the scene. My main idea was cleaning the points every time the song is stopped (as the Tonejs player doesn't seem to have a pause function 😑). Sadly, with all the documentation and help from the vast Internet I couldn't make my code work. Maybe [clearing the scene](https://stackoverflow.com/questions/30359830/how-do-i-clear-three-js-scene) is the way to go, but even that is not that easy.
The following bit of code is what DIDN'T WORK (I did not put more work into this, because I needed to move on with other parts).
```
function removePoints(){
	for (let i = 0; i < points.length; i++) {
		scene.remove( scene.getObjectById(i+100) );
	}
	points = [];
	console.log("points cleaned");
}
```


### Conclusions, after thoughts and future upgrades
Sadly, this was it. I couldn't get anything else done, due to time and me wasting some of that trying to understand other things I'll use in the future. Anyway, I do have a long list of possible upgrades I'll definitely work on!

1. **[Custom geometries](https://threejs.org/docs/#api/core/Geometry)**: The next step was creating the custom surfaces from the points I gathered with the FFT analysis. From what I already learned, I have to tell the renderer when the vertices have been added and need updating with the `verticesNeedUpdate` property.
2. **Shaders?**: Searching through the mysterious and complicated Internet, someone suggested that using shaders was more efficient than creating custom surfaces by defining it's vertices. But I think I'll do it [maybe](https://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/) [later](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/) (though this seems really fun, and matrix transformations are not that hard for me to understand (see mom? civil engineering was useful in my artistic life in the end!)).
3. [**Interface.js**](http://charlie-roberts.com/interface/): A very nice library to create a visually pleasing interface. Has lots of buttons, sliders, knobs, etc.
4. While getting help from the residents, [Aarón](montoyamoraga.io) pointed out that Three.js and Tone.js could interfere on the sound, as both set new *Audio Contexts*. I need to set [Three.js audio context](https://threejs.org/docs/#api/audio/AudioContext) to Tone.js (tried and failed for now).
5. **VR**!!! This is what I'm most excited about trying. Three.js obviously has the ability to render to VR ([example](https://github.com/mrdoob/three.js/blob/dev/examples/webvr_cubes.html)), but my research has not produced any results for now. This will definitely make it into my final.

The [repository is here](https://github.com/nicolaspe/itp_icm/tree/gh-pages/class08/musicTrip) and the [working sketch is over here](https://nicolaspe.github.io/itp_icm/class08/musicTrip/).
