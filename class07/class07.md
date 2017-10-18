# Intro to Comp Media - Oct 18

### Outline
1. homework presentations
2. questions
3. loading CSVs

### DOM elements
As p5.js live on the browser, the p5.dom library creates the HTML objects and inserts them into the HTML file without you doing anything.

When programming a button, in order to make it do something, you need to define it's `mouseClicked` function (in javascript functions are "handled" like variables, so they can be put inside functions in the following way).

```
button.mouseClicked(doSomething);

function doSomething() {
	// blah blah blah
}
```

### Data visualization

When getting data from the internet, you might get it in the **CSV** (Comma Separated Value) format. The columns are separated by commas, and the rows are separated in different lines.

To load the data, use the funciton `loadTable(<filename>, "csv", "header");` (the header row has the names of the columns). This cannot be written inside the `setup()` function, it needs to be loaded in `preload()` (to avoid having to setup callbacks whenever the data is actually loaded).

**Tables methods and attributes**
- `.getRowCount()`
- `columns` shows the name of the columns (loaded from the header!)
- `getNum(rowNumber, "label")`

### Assignment
Create a sketch that loads external data (whether from an existing file or through a web API). Interpret this data visually or interactively.
