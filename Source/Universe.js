
class Universe
{
	constructor(display, timerHelper, world)
	{
		this.display = display;
		this.timerHelper = timerHelper;
		this.world = world;

		this.inputHelper = new InputHelper();

	}

	initialize()
	{
		this.display.initialize(this);
		this.inputHelper.initialize(this);
		this.world.initialize(this);
		this.timerHelper.initialize(this);
	}

	updateForTimerTick()
	{
		this.inputHelper.updateForTimerTick(this);
		this.world.updateForTimerTick(this);
	}
}
