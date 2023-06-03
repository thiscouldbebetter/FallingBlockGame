
class InputHelper
{
	constructor()
	{
		this.keysPressed = [];
	}

	handleEventKeyDown(event)
	{
		var key = event.key;
		if (this.keysPressed.indexOf(key) == -1)
		{
			this.keysPressed.push(key);
		}

	}

	handleEventKeyUp(event)
	{
		this.keyRelease(event.key);
	}

	initialize(universe)
	{
		var d = document;
		d.body.onkeydown =
			this.handleEventKeyDown.bind(this);
		d.body.onkeyup =
			this.handleEventKeyUp.bind(this);
	}

	keyRelease(key)
	{
		var indexOfKey = this.keysPressed.indexOf(key);
		if (indexOfKey >= 0)
		{
			this.keysPressed.splice(indexOfKey, 1);
		}
	}

	updateForTimerTick(universe)
	{
		// todo
	}
}
