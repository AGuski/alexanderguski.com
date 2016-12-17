export default class {
	constructor(x, y, screen){
		this._x = x;
    this._y = y;
    this._length = 0;
    this._height = 1;
		this._screen = screen;
		this.selectable = true;
		this.focused = false;
		
	}

	// When the element gets focused on the screen
	focus() {}

	// When the element loses focused on the screen
	unfocus() {}

	// When the elemet is focused and get confirmed on the screen
	confirm() {}
}