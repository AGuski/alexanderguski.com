import Interactor from './Interactor.class';

export default class extends Interactor {
  constructor(x, y, length, screen) {
    super(x, y, screen);
    this._length = length;
    this._text = '';

    this._caretChar = {
      char: '',
      fg: '',
      bg: screen._display._options.fg
    };
    this._caretPos = this._x;
    this._caretBlinkSpeed = 500;

    // Make Caret blink
    setInterval( () => {
      // on
      this._screen.drawChar(this._caretPos, this._y, 
        this._caretChar.char, 
        this._caretChar.fg,
        this._caretChar.bg);
      // off
      setTimeout( () => {
        this._screen.deleteChar(this._caretPos,this._y);
      }, this._caretBlinkSpeed);
    }, this._caretBlinkSpeed*2);

    // initial caret - TODO: only on focused field
    
  }

  handleInput(inputType, inputData) {
    if (inputType === 'keydown') {

      // backspace
      if (inputData.keyCode === 8) {
        // Delete char and draw caret
        this._text = this._text.slice(0, -1);
        this._screen.deleteChar(this._caretPos--,this._y);
        if (this._caretPos < this._x) {
          this._caretPos = this._x;
        }
      }
    }
    // text typing (and moving caret)
    if (inputType === 'keypress' && (this._caretPos < this._x+this._length)) {

      let ch = String.fromCharCode(inputData.keyCode);
      this._text += ch;
      this._screen.deleteChar(this._caretPos,this._y);
      this._screen.drawChar(this._caretPos++,this._y, ch,'', '');
    }
    // force show caret while typing
    this._screen.drawChar(this._caretPos, this._y, 
      this._caretChar.char, 
      this._caretChar.fg, 
      this._caretChar.bg);
  }

  // Getter
  
  getText() {
    return this._text;
  }

  // Setter
  
  setText(string) {
    this._text = string;
    this._screen.drawText(this._x, this._y, string);
    this._caretPos = this._x+string.length;
  }

}