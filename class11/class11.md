# Intro to Comp Media - Nov 15

### Outline
1. about final projects
2. programming classes Spring 2k18
3. text
4. local dev?

### Text

`text("text", posX, posY, limitX, limitY)` but this time, the position anchor is the **baseline** of the text.

Can be changed by:
- `fill()` changes the color
- `stroke()` gives an outline
- `textSize()` changes the size
- `textAlign($1, $2)`
 - first parameter can be `LEFT`, `CENTER` or `RIGHT`
 - second parameter can be `BOTTOM`, `BASELINE`, `CENTER` or `TOP`
- `textLeading()` space between lines
- `textFont()` changes the font, but *has to be installed on the user's computer*. Otherwise, you can upload the font file! Or use Google fonts (custom link in html file)

```
var myFont;

function preload(){
	myFont = loadFont("customfont.otf");
}

textFont(myFont);
```

```
textInput = createInput("default text");
```
