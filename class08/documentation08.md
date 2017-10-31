
## Creating [Tone.js](https://tonejs.github.io/)
It is a library by [Yotam Mann](https://github.com/tambien)

#### HOW THE !@#$% YOU CONNECT IT?!
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

## Extra!
- [Interface.js](http://charlie-roberts.com/interface/)
