import TextField from '../screen/ui/TextField.class';
import TextButton from '../screen/ui/TextButton.class';

export default class {
	constructor(display) {
		this._display = display;
		this._width = display.getDisplayWidth();
		this._height = display.getDisplayHeight();
		this._data = {};

		this.elements = [];
    this.focusedElement;

	}

  enter() {}

  leave() {}

	handleInput(inputType, inputData) {
    this.customHandleInput(inputType, inputData);
		if (this.focusedElement) {
      this.focusedElement.handleInput(inputType, inputData);
    }
	}

  handleMouseInput(inputType, mousePos) {
    let hoveredEl = this.elements.filter((element) => {
      return (mousePos[0] >= element._x && 
          mousePos[0] <= element._x+element._length-1 &&
          mousePos[1] >= element._y && 
          mousePos[1] <= element._y+element._height-1);
    })[0];

    if (hoveredEl && inputType === 'mousemove') {
        this.setFocus(hoveredEl);
    }

    if (hoveredEl && inputType === 'mousedown') {
      hoveredEl.handleInput(inputType);
    }
  }

  customHandleInput(inputType, inputData) {
    console.log(inputType, ": ", inputData.keyCode);
  }

	render(){
		// 1. Draw content of this._data
    this._display.clear();
    for (let tile in this._data) {
      if(this._data[tile]) {
        this._display.draw(
        this._data[tile][0],
        this._data[tile][1],
        this._data[tile][2],
        this._data[tile][3],
        this._data[tile][4]);
      }
    }
	}

	clear() {
		this._display.clear();
		this._data = {};
	}

	/* Drawing Methods */

	drawChar(x, y, char, fg, bg) {
    let currentBG = '';
    if (this._data[x+','+y]) {
      currentBG = this._data[x+','+y][4];
    }
    this._data[x+','+y] = [x, y, char,fg || '', bg || currentBG];
  }

  draw(x, y, tile) {
    if(x < 0 || y < 0 || x >= this._width || y >= this._height) {
      return;
    }
    let bg = tile.bg;
    if (bg === '' || bg === 'transparent'){
      bg = this._data[x+','+y][4];
    }
    this.drawChar(x, y, tile.glyph, tile.fg, bg);
  }

  deleteChar(x, y) {
    if (this._data[x+','+y]) {
      this._data[x+','+y] = undefined;
    }
  }

  drawText(x, y, string, fg, bg) {
    if (x === 'center') {
      x = this._width/2-Math.floor(string.length/2);
    }
    if (y === 'center') {
      y = this._height/2-1;
    }
    for (let char of string){
      this.drawChar(x++, y, char, fg, bg);
    }
  }

  typeText(x, y, string, speed, callback, fg, bg) {
    // maybe TODO? clear area first
    // now type
    let n = 1;
    for (let char of string){
      setTimeout( () => {
        this.deleteChar(x,y);
        this.drawChar(x++, y, char, fg, bg);
        this.drawChar(x, y, '', '', '#75ff74');
      }, speed*n);
      n++;
      setTimeout( () => {
        this.deleteChar(x,y);
        if (callback) { callback(); }
      }, speed*(string.length+4));
    }
  }

  // Boxes - to be refactored

  drawBox(x, y, width, height, fg, bg) {
    // 1. draw corners
    this.drawChar(x, y, '┏', fg, bg);
    this.drawChar(x+width+1, y, '┓', fg, bg);
    this.drawChar(x, y+height+1, '┗', fg, bg);
    this.drawChar(x+width+1, y+height+1, '┛', fg, bg);

    // 2. draw lines
    for (let i = x+1; i <= x+width; i++) {
      this.drawChar(i, y, '━', fg, bg);
      this.drawChar(i, y+height+1, '━', fg, bg);
    }
    for (let j = y+1; j <= y+height; j++) {
      this.drawChar(x, j, '┃', fg, bg);
      this.drawChar(x+width+1, j, '┃', fg, bg);
    }
  }

  drawDoubleBox(x, y, width, height, fg, bg) {
    // 1. draw corners
    this.drawChar(x, y, '╔', fg, bg);
    this.drawChar(x+width+1, y, '╗', fg, bg);
    this.drawChar(x, y+height+1, '╚', fg, bg);
    this.drawChar(x+width+1, y+height+1, '╝', fg, bg);

    // 2. draw lines
    for (let i = x+1; i <= x+width; i++) {
      this.drawChar(i, y, '═', fg, bg);
      this.drawChar(i, y+height+1, '═', fg, bg);
    }
    for (let j = y+1; j <= y+height; j++) {
      this.drawChar(x, j, '║', fg, bg);
      this.drawChar(x+width+1, j, '║', fg, bg);
    }
  }

  /* Interactive Elements */

  addTextButton(x, y, string, callback) {
    let button = new TextButton(x,y, string, callback, this);
    this.elements.push(button);
    return button;
  }

  addTextField(x, y, length) {
    let textfield = new TextField(x, y, length, this);
    this.elements.push(textfield);
    return textfield;
  }

  setFocus(element) {
    if (this.focusedElement) {
      this.focusedElement.unfocus();
    }
    this.focusedElement = element;
    element.focused = true;
    element.focus();
  }

  /* Helper Methods */

  getOffsetCenterX(x) {
    return Math.floor(this._width/2+x);
  }

  getOffsetCenterY(y) {
    return Math.floor(this._height/2+y);
  }

}