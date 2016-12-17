import TestScreen from './screen/TestScreen.class.js';

export default class extends ROT.Display {
  constructor(options){
    super(options);

    this._width = options.width;
    this._height = options.height;

    this.mousePos = [-1,-1];

    this._refreshRate = 5;
    
    this._currentScreen = new TestScreen(this);

    let container = document.querySelector('#retro-mode');

    container.addEventListener('mousemove', (e) => {
      if (this.mousePos[0] !== this.eventToPosition(e)[0] || 
        this.mousePos[1] !== this.eventToPosition(e)[1]) {

        this.mousePos = this.eventToPosition(e);
        this._currentScreen.handleMouseInput('mousemove', this.mousePos);

      }
    });

    container.addEventListener('mousedown', (e) => {
      this.mousePos = this.eventToPosition(e);
      this._currentScreen.handleMouseInput('mousedown', this.mousePos);
    });

    /* Send Input to Screen */
    document.addEventListener('keydown', (e) => {
      // TODO: Make list with keys better
      if ([8,37,38,39,40].includes(e.keyCode) ) {
        e.preventDefault();
        this._currentScreen.handleInput('keydown', e);
      }
    });

    document.addEventListener('keypress', (e) => {
      if (!e.metaKey) {
        e.preventDefault();
        this._currentScreen.handleInput('keypress', e);
      }
    });

    this._currentScreenInterval = setInterval( () => this._currentScreen.render(), this._refreshRate);
  }

  /* Getter */

  getDisplayWidth() {
    return this._width;
  }

  getDisplayHeight() {
    return this._height;
  }

  /* Setter */

  setCurrentScreen(screen) {
    this._currentScreen.leave();
    this._currentScreen = screen;

    // Timeout for gl loading
    setTimeout(() => {
      this.glRenderer.clearGLObjects();
      screen.enter();
    }, 5);
  }

  setDisplayWidth(x) {
    this._width = x;
  }

  setDisplayHeight(y) {
    this._height = y;
  }
}
