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

    this.clear();

    setInterval( () => {
      this.drawText(2,0, Date.now().toString(), '#082d08', '#75ff74');
    }, this._display.refreshRate);

    //this.drawText('center', 2, `${this._currentAccount.surname} ${this._currentAccount.name}`);


    // ROTIERENDER BRIEF STATTDESSEN!?!?! 


    // this.drawText('center',this.getOffsetCenterY(-12), `  ___         _           _   `);
    // this.drawText('center',this.getOffsetCenterY(-11), ` / __|___ _ _| |_ __ _ __| |_ `);
    // this.drawText('center',this.getOffsetCenterY(-10), `| (__/ _ \\ ' \\  _/ _\` / _|  _|`);
    // this.drawText('center',this.getOffsetCenterY(-9),  ` \\___\\___/_||_\\__\\__,_\\__|\\__|`);
    
    // let messagesBtn = this.addTextButton(9, 20, `Mail[${this._currentAccount.mails.length}]`, () => {
    //   console.log('messages');
    // });  

    let imprintPos = {
      x: this.getOffsetCenterX(-10),
      y: this.getOffsetCenterY(0)
    }

    
    let typeSpeed = 30;

    this.typeText(imprintPos.x-6, imprintPos.y, 'Contact: mail@alexanderguski.com', typeSpeed);


    // this.setFocus(messagesBtn);

    let menuPosY = this.getOffsetCenterY(12);
    let xCenter =  this.getOffsetCenterX(0);

    this.addTextButton(xCenter-2, menuPosY, 'Back', () => {
      this._display.setCurrentScreen(this._display.screens.mainScreen);
    });


    let mail = this._display.glRenderer.addGLMail(0,150);
    mail.animation = () => {
      mail.rotation.y += 0.005;
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
                                   


