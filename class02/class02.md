# Intro to Comp Media - Sept 13

### Outline
1. Schedule
2. Homework presentations
3. Answers to questions
4. Variables
5. Animation
6. Interaction

### Make-up session
No class on October 4th, due to travel.
Make-up session will be October 13th, 12:10 - 14:40.

> Programming takes complexity of a system and translates it into a set of rules. A programmer's mind tries to unveil the rules behind and simplify

### Bloody `arc()` function (questions, the only one)
```
arc(x, y, width, height, theta1, theta2, option)
 - x, y: coordinates of center of the ellipse
 - width, height of the ellipse
 - theta1: angle to start the arc (radians)
 - theta2: angle to stop the arc (radians)
 - option: OPEN, CHORD, PIE
```

### Variables
> Programming is laziness

There is a way to give names to values and keep track of them: **variables**.
- Variables have to be **declared**
- You can **set** information into the variable or **get** the information from the variable
- `let <variable> = <expression>`

There are also **built in** variables. You don't want to write into them, but you can freely access them. Look into [Environment on the p5js Reference](https://p5js.org/reference/#group-Environment). With this you can use the mouse (`mouseX` & `mouseY`) to control elements on the sketch.

### Animation
For every frame, the computer erases everything first, and then draws the current status of the object for the corresponding time. All of this happens on the code written inside of `draw(){ ... }`!!!

1. draw 24 fps (or more!)
2. for frame 'n' > where should the circle be?

One of the built-in elements that's essential for animations is the `frameCount` variable.

For the sketch created during class follow [this link](http://alpha.editor.p5js.org/full/SJoUXgv5-).
