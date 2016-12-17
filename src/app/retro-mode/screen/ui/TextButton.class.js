import Interactor from './Interactor.class';

export default class extends Interactor {
	constructor(x,y, string, callback, screen) {
		super(x, y, screen);
		this._string = string;
		this._callback = callback;
		this._length = string.length;


		this._screen.drawText(x,y, string);


	}

	focus() {
		this._screen.drawText(this._x, this._y, this._string, '#082d08', '#75ff74');
	}

	unfocus() {
		this._screen.drawText(this._x, this._y, this._string, '#75ff74', '#082d08');
	}

	confirm() {
		this._callback();
	}

	handleInput(inputType, inputData) {
		// `Return` input
		if (inputType === 'mousedown' || inputData.keyCode === 13) {
			this.confirm();
		}
	}
}