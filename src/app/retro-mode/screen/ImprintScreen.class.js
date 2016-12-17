import Screen from './Screen.class';

const imprintText = [
      'Angaben gem. § 5 TMG',
      'Betreiber und Kontakt:',
      'Alexander Guski',
      'Wilsnacker Straße 11',
      '10559 Berlin',
      'Telefonnummer: +49 170 1254488',
      'E-Mail-Adresse: mail@alexanderguski.com',
      'Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO',
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit,',
      'die Sie unter http://ec.europa.eu/consumers/odr/ finden.'
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

    this.drawText('center',this.getOffsetCenterY(-12), ` ___                                     `);
    this.drawText('center',this.getOffsetCenterY(-11), `|_ _|_ __  _ __ _ _ ___ _______  _ _ __  `);
    this.drawText('center',this.getOffsetCenterY(-10), ` | || '  \\| '_ \\ '_/ -_|_-<_-< || | '  \\ `);
    this.drawText('center',this.getOffsetCenterY(-9), `|___|_|_|_| .__/_| \\___/__/__/\\_,_|_|_|_|`);
    this.drawText('center',this.getOffsetCenterY(-8), `          |_|                            `);
    
    // let messagesBtn = this.addTextButton(9, 20, `Mail[${this._currentAccount.mails.length}]`, () => {
    //   console.log('messages');
    // });  

    let imprintPos = {
      x: this.getOffsetCenterX(-10),
      y: this.getOffsetCenterY(-5)
    }

    
    let typeSpeed = 30;

    // This is ridiculus!!!!

    this.typeText(imprintPos.x-1, imprintPos.y-1, imprintText[0], typeSpeed);
    setTimeout(() => {
      this.typeText(imprintPos.x-6, imprintPos.y+2, imprintText[1], typeSpeed);
      setTimeout(() => {
        this.typeText(imprintPos.x-6, imprintPos.y+4, imprintText[2], typeSpeed);
        setTimeout(() => {
          this.typeText(imprintPos.x-6, imprintPos.y+5, imprintText[3], typeSpeed);
          setTimeout(() => {
            this.typeText(imprintPos.x-6, imprintPos.y+6, imprintText[4], typeSpeed);
            setTimeout(() => {
              this.typeText(imprintPos.x-6, imprintPos.y+8, imprintText[5], typeSpeed);
              setTimeout(() => {
                this.typeText(imprintPos.x-6, imprintPos.y+9, imprintText[6], typeSpeed);
                setTimeout(() => {
                  this.typeText(imprintPos.x-14, imprintPos.y+11, imprintText[7], typeSpeed/2);
                  setTimeout(() => {
                    this.typeText(imprintPos.x-32, imprintPos.y+13, imprintText[8], typeSpeed/2.5);
                    setTimeout(() => {
                      this.typeText(imprintPos.x-32, imprintPos.y+14, imprintText[9], typeSpeed/2.5);
                    }, 1000);
                  }, 1000);
                }, 1200);
              }, 800);
            }, 700);
          }, 600);
        }, 500);
      }, 1000);
    }, 1000);
 


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
                                   


