import Screen from './Screen.class';

const aboutText = [
  'Alexander Guski is a creative software developer.',
  'He lives and works in Berlin, Germany.'
]

export default class extends Screen {
	constructor(display, callbacks) {
		super(display);
    this.callbacks = callbacks;
	}

  enter() {

    if (this.focusedElement) {
      this.focusedElement.unfocus();
    }

    this.clear();

    setInterval( () => {
      this.drawText(2,0, Date.now().toString(), '#082d08', '#75ff74');
    }, this._display.refreshRate);

    //this.drawText('center', 2, `${this._currentAccount.surname} ${this._currentAccount.name}`);


    // ROTIERENDER BRIEF STATTDESSEN!?!?! 


    this.drawText('center',this.getOffsetCenterY(-12), `    _   _              _   `);
    this.drawText('center',this.getOffsetCenterY(-11), `   /_\\ | |__  ___ _  _| |_ `);
    this.drawText('center',this.getOffsetCenterY(-10), `  / _ \\| '_ \\/ _ \\ || |  _|`);
    this.drawText('center',this.getOffsetCenterY(-9),  ` /_/ \\_\\_.__/\\___/\\_,_|\\__|`);
    
    // let messagesBtn = this.addTextButton(9, 20, `Mail[${this._currentAccount.mails.length}]`, () => {
    //   console.log('messages');
    // });

    this.drawText(this.getOffsetCenterX(-22), this.getOffsetCenterY(0), aboutText[0]);
    this.drawText(this.getOffsetCenterX(-17), this.getOffsetCenterY(1), aboutText[1]);


    // this.setFocus(messagesBtn);

    let menuPosY = this.getOffsetCenterY(12);
    let xCenter =  this.getOffsetCenterX(0);

    this.addTextButton(xCenter-2, menuPosY, 'Back', () => {
      this._display.setCurrentScreen(this._display.screens.mainScreen);
    });
    
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
                                   


