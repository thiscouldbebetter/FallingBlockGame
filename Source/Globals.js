
class Globals
{
	static Instance = new Globals();

	initialize
	(
		millisecondsPerTimerTick, 
		viewSizeInPixels,
		world
	)
	{
		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize
		(
			viewSizeInPixels,
			viewSizeInPixels.clone().divide
			(
				world.level.map.sizeInCells
			)
		);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.world = world;
		this.world.initialize();

		setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		)
	}

	handleEventTimerTick()
	{
		this.inputHelper.updateForTimerTick();
		this.world.updateForTimerTick();
	}
}
