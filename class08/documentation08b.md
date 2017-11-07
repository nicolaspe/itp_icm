# The word is progress!

## Surfaces!
[Creation](https://stackoverflow.com/questions/9252764/how-to-create-a-custom-mesh-on-three-js)

[Updating the surface](https://github.com/mrdoob/three.js/issues/1091)

```
soundSurf.geometry.verticesNeedUpdate = true;
soundSurf.geometry.elementsNeedUpdate = true;
```


## Particles!
[link](https://aerotwist.com/tutorials/creating-particles-with-three-js/)

# VR World!

BIG thanks to [Or Fleisher](http://orfleisher.com/)

[WebVR](https://webvr.info/developers/)

First of all `renderer.vr.enabled = true;`

`document.body.appendChild( WEBVR.getButton( renderer ) );`

### New controls
Orbit Controls is not useful for this, it's best to use the new VRControls `var controls = new THREE.VRControls(camera);`

### Chrome extensions!
[WebVR API Emulation](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil)

### Change in Pipeline!
```
function update(){
	renderer.animate(animate);
}
function animate() {
	// requestAnimationFrame(animate); // <- NOT ANYMORE!!
	controls.update();
	renderer.render(scene, camera);
}
update();
```

## Let's go mobile!
To use it on Android devices...

But for other devices (ahem, iPhone, ahem), you need to use something additional: [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) to fill the ...



## Future!
- Add texture and layers to the surfaces, as seen in this [example](http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/)
