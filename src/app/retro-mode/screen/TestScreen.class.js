import Screen from './Screen.class';

export default class extends Screen {
	constructor(display) {
		super(display);
		this.display = display;
		// Test Content //
		setInterval( () => {
			this.drawText(2,0, Date.now().toString(), '#082d08', '#75ff74');
		}, this._display.refreshRate);
		
		this.drawText(4, 3, 'KERNEL.SYS_ROOT:AUTH/1X4y6SafC14s0r');
		

		// setTimeout(() => {
		// 	this.typeText(4, 5, 'Hello?', 150);
		// 	setTimeout(() => {
		// 		this.typeText(11, 5, 'Anybody there?', 150);
		// 	}, 1000);
		// }, 0);


		// let testInput = this.addTextField(9, 10, 48);
		// this.focusedElement = testInput;

	}

	handleInput(inputType, inputData) {
		console.log(inputType, ": ", inputData.keyCode);

		if (this.focusedElement) {
      this.focusedElement.handleInput(inputType, inputData);
    }
	}
}