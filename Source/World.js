
class World
{
	constructor(blockDefns, level)
	{
		this.blockDefns = blockDefns;
		this.level = level;
	}

	initialize()
	{
		this.level.initialize();
	}

	updateForTimerTick()
	{
		if (this.level != null)
		{
			this.level.updateForTimerTick();
		}
	}
}
