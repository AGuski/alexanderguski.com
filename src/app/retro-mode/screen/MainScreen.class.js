import Screen from './Screen.class';

export default class extends Screen {
	constructor(display, callbacks) {
		super(display);
    this.callbacks = callbacks;
	}

  enter() {

    if (this.focusedElement) {
      this.focusedElement.unfocus();
    }

    setInterval( () => {
      this.drawText(2,0, Date.now().toString(), '#082d08', '#75ff74');
    }, this._display.refreshRate);

    //this.drawText('center', 2, `${this._currentAccount.surname} ${this._currentAccount.name}`);

    this.drawText('center',this.getOffsetCenterY(-8), ` _      __    __                  `);
    this.drawText('center',this.getOffsetCenterY(-7), `| | /| / /__ / /______  __ _  ___ `);
    this.drawText('center',this.getOffsetCenterY(-6), `| |/ |/ / -_) / __/ _ \\/  ' \\/ -_)`);
    this.drawText('center',this.getOffsetCenterY(-5), `|__/|__/\\__/_/\\__/\\___/_/_/_/\\__/ `);

    this.drawText('center',this.getOffsetCenterY(-4), 'to the AlexanderGuski.com network');

    setInterval( () => {
      let currentTime = new Date(Date.now()).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      this.drawText('center',this.getOffsetCenterY(0), 'Current time: '+currentTime);
    }, this._display.refreshRate);

    // let surfTemp = -50-Math.floor(Math.random()*10);
    // this.drawText('center',14, `Surface temperature: ${surfTemp}C°`);
    
    
    // let messagesBtn = this.addTextButton(9, 20, `Mail[${this._currentAccount.mails.length}]`, () => {
    //   console.log('messages');
    // });

    // this.setFocus(messagesBtn);

    let menuPosY = this.getOffsetCenterY(8);
    let xCenter =  this.getOffsetCenterX(0);

    this.addTextButton(xCenter-26, menuPosY, 'Normal Mode', () => {
      console.log('Normal Mode');
      // this._display.setCurrentScreen(this._gameData.screens.mapScreen);
      this.callbacks.deactivateRetroMode('app.landing');
    });

    this.addTextButton(xCenter-9, menuPosY, 'About', () => {
      this._display.setCurrentScreen(this._display.screens.aboutScreen);
    });

    this.addTextButton(xCenter+2, menuPosY, 'Contact', () => {
      this._display.setCurrentScreen(this._display.screens.contactScreen);
    });

    this.addTextButton(xCenter+14, menuPosY, 'Imprint', () => {
      this._display.setCurrentScreen(this._display.screens.imprintScreen);
    });

    let sphere = this._display.glRenderer.addGLSphere(50, 8, -280, 110);
    sphere.animation = () => {
      sphere.rotation.y += 0.005;
    }
    
  }

  customHandleInput(inputType, inputData) {
    let n = this.elements.indexOf(this.focusedElement);
    if (inputData.keyCode === 39 && this.elements[n+1]) {
      this.setFocus(this.elements[n+1]);
    }
    if (inputData.keyCode === 37 && this.elements[n-1]) {
      this.setFocus(this.elements[n-1]);
    }
  }
}
                                   


