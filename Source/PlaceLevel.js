
class PlaceLevel
{
	constructor(level)
	{
		this.level = level;
	}

	finalize(universe, world)
	{
		// todo
	}

	initialize(universe, world)
	{
		this.level.initialize(universe, world);
	}

	updateForTimerTick(universe, world)
	{
		this.level.updateForTimerTick(universe, world);
	}
}